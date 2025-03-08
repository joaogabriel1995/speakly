// src/application/useCases/messaging/ProcessQueueMessagesUseCase.ts
import { z } from 'zod';
import { IMessageBroker } from '../../../infrastructure/messaging/message-broker';
import { PlanStudyOutputSchema } from '../../schemas/processing-plan-study-output.schema';
import { LearningJourneyInput } from '../../schemas/learning-jorney-input.schema';
import { CreateManyLearningJourney } from '../plan-study/create-learning-journey';
import { CreateLearningSettingsUseCase } from '../learningSettings/create-learning-settings.use-case';

// Schema de exemplo para mensagens da fila (pode ser movido para fora ou parametrizado)

// Definindo o schema para uma única entrada do plano

export class ProcessPlanMessagesUseCase<TMessage> {
  constructor(
    private readonly messageBroker: IMessageBroker<TMessage>,// TMessage é genérico,
    private readonly wsBroker: IMessageBroker<TMessage>,// TMessage é genérico,
    private readonly createManyLearningJourney: CreateManyLearningJourney,
    private readonly createLearningSettingsUseCase: CreateLearningSettingsUseCase
  ) { }

  private async onMessage(message: TMessage) {
    console.log(message)

    const data = this.extractContent(message);
    try {

      const planStudyData = PlanStudyOutputSchema.parse(data);
      console.log('Mensagem validada:', planStudyData);
      if (this.messageBroker.ack) {

        const {settings, ...rest} = planStudyData
        const learningSetting = await this.createLearningSettingsUseCase.execute(settings)
        console.log(learningSetting)
        const learningInput = LearningJourneyInput.parse({ "learningSettingsId": learningSetting.getId(), ...rest });

        await this.createManyLearningJourney.execute(learningInput)
        await this.wsBroker.publish(`${planStudyData.userId}/planStudy`, planStudyData);
        await this.wsBroker.publish(`${planStudyData.userId}/alert`, { text: "Plano de Estudos Concluida" });
        await this.messageBroker.ack(message);
      }
    } catch (error) {
      console.error('Erro de validação:', error);
      await this.onError(error as Error, message);
    }
  }

  private async onError(error: Error, message: TMessage) {
    const maxAttempts = 5;
    let attempts = this.getAttempts(message) || 0;
    attempts++;

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
        this.extractContent(message),
        { headers: { attempts } }
      );
    }
  }

  public async execute(queue: string): Promise<void> {
    await this.messageBroker.subscribe(
      queue,
      (message, ack, nack) => this.onMessage(message),
      (error, message, ack, nack) => this.onError(error, message)
    );
  }

  private extractContent(message: TMessage): object {
    if ('content' in (message as any)) {
      return JSON.parse((message as any).content.toString('utf-8'));
    }
    throw new Error('Message format not supported: missing content');
  }

  private getAttempts(message: TMessage): number | undefined {
    if ('properties' in (message as any) && (message as any).properties.headers) {
      return parseInt((message as any).properties.headers['attempts'], 10) || 0;
    }
    return 0;
  }
}
