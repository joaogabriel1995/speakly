import { z } from "zod";
import { IMessageBroker } from "../../../infrastructure/messaging/message-broker";
import {
  extractContent,
  getAttempts,
  handleMessageError,
} from "../../../infrastructure/messaging/message-utils";
import { WeeklyStudyPlanDetailWithContentSchema, WeeklyStudyPlanDetailWithContent, DailyContentSchema, DailyActivitySchema } from "../../schemas/process-detail-learning-messages-schema";



export class ProcessDetailLearningMessagesUseCase<TMessage = WeeklyStudyPlanDetailWithContent> {
  constructor(
    private readonly messageBroker: IMessageBroker<TMessage>,
    private readonly wsBroker: IMessageBroker<TMessage>,
  ) { }

  async onMessage(message: any) {
    console.log("Mensagem recebida:", message);

    const actualMessage = Array.isArray(message) ? message[0] : message;
    const data = extractContent(actualMessage);
    console.log("data:", data);

    const parseResult = WeeklyStudyPlanDetailWithContentSchema.safeParse(data);
    if (!parseResult.success) {
      console.error("Erro de validação:", parseResult.error);
      throw new Error("Dados inválidos recebidos");
    }

    if (this.messageBroker.ack) {
      await this.messageBroker.ack(message);
    }
  }

  private async onError(error: Error, message: TMessage) {
    console.error("Erro de validação:", error);
    await handleMessageError(
      this.messageBroker,
      message,
      "weekly_detail_plan",
      1,
    );
  }
  public async execute(queue: string): Promise<void> {
    await this.messageBroker.subscribe(
      queue,
      (message, ack, nack) => this.onMessage(message),
      (error, message, ack, nack) => this.onError(error, message),
    );
  }
}
