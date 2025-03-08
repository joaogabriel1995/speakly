// src/application/useCases/messaging/ProcessPlanMessagesUseCase.ts
import { z } from "zod";
import { IMessageBroker } from "../../../infrastructure/messaging/message-broker";
import {
  extractContent,
  getAttempts,
} from "../../../infrastructure/messaging/message-utils";
import {
  PlanEntryDto,
  PlanStudyOutputSchema,
} from "../../schemas/processing-plan-study-output.schema";
import { LearningJourneyInput } from "../../schemas/learning-jorney-input.schema";
import { CreateManyLearningJourney } from "../plan-study/create-learning-journey.use-case";
import { CreateLearningSettingsUseCase } from "../learningSettings/create-learning-settings.use-case";

export class ProcessPlanMessagesUseCase<TMessage> {
  constructor(
    private readonly messageBroker: IMessageBroker<TMessage>,
    private readonly wsBroker: IMessageBroker<TMessage>,
    private readonly createManyLearningJourney: CreateManyLearningJourney,
    private readonly createLearningSettingsUseCase: CreateLearningSettingsUseCase,
  ) {}

  private async onMessage(message: TMessage) {
    const data = extractContent(message) as PlanEntryDto;

    data.settings.userId = data.userId;

    try {
      const planStudyData = PlanStudyOutputSchema.parse({
        plan: data.plan,
        userId: data.userId,
        settings: data.settings,
      });
      console.log("Mensagem validada:", planStudyData);
      if (this.messageBroker.ack) {
        const { settings, ...rest } = planStudyData;
        const learningSetting =
          await this.createLearningSettingsUseCase.execute(settings);
        console.log(learningSetting);
        const learningInput = LearningJourneyInput.parse({
          learningSettingsId: learningSetting.getId(),
          ...rest,
        });

        await this.createManyLearningJourney.execute(learningInput);
        await this.wsBroker.publish(
          `${planStudyData.userId}/planStudy`,
          planStudyData,
        );
        await this.wsBroker.publish(`${planStudyData.userId}/alert`, {
          text: "Plano de Estudos Concluida",
        });
        await this.messageBroker.ack(message);
      }
    } catch (error) {
      console.error("Erro de validação:", error);
      await this.onError(error as Error, message);
    }
  }

  private async onError(error: Error, message: TMessage) {
    const maxAttempts = 5;
    const attempts = getAttempts(message);

    if (attempts >= maxAttempts) {
      if (this.messageBroker.nack) {
        await this.messageBroker.nack(message, false);
      }
    } else {
      if (this.messageBroker.ack) {
        await this.messageBroker.ack(message);
      }
      await this.messageBroker.publish(
        "agent-plan-study",
        extractContent(message),
        { headers: { attempts: attempts + 1 } },
      );
    }
  }

  public async execute(queue: string): Promise<void> {
    await this.messageBroker.subscribe(
      queue,
      (message, ack, nack) => this.onMessage(message),
      (error, message, ack, nack) => this.onError(error, message),
    );
  }
}
