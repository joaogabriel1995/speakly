// src/application/useCases/messaging/ProcessTranscriptionMessagesUseCase.ts
import { z } from "zod";
import { IMessageBroker } from "../../../infrastructure/messaging/message-broker";
import {
  extractContent,
  getAttempts,
  handleMessageError,
} from "../../../infrastructure/messaging/message-utils";

// Schema de exemplo para mensagens da fila
const queueMessageSchema = z.object({
  url: z.string(),
  language: z.string().nullable(),
  status: z.string(),
  userId: z.string(),
  trasncriberType: z.string(),
  text: z.string(),
});
type QueueMessage = z.infer<typeof queueMessageSchema>;

export class ProcessTranscriptionMessagesUseCase<TMessage> {
  constructor(
    private readonly messageBroker: IMessageBroker<TMessage>,
    private readonly wsBroker: IMessageBroker<TMessage>,
  ) {}

  private async onMessage(message: TMessage) {
    const data = extractContent(message);
    try {
      const transcriptionData = queueMessageSchema.parse(data);
      console.log("Mensagem validada:", transcriptionData);
      if (this.messageBroker.ack) {
        await this.wsBroker.publish(
          `${transcriptionData.userId}/transcription`,
          { ...transcriptionData },
        );
        await this.wsBroker.publish(`${transcriptionData.userId}/alert`, {
          text: "Transcrição Concluida",
        });
        await this.messageBroker.ack(message);
      }
    } catch (error) {
      console.error("Erro de validação:", error);
      await this.onError(error as Error, message);
    }
  }

  // ProcessTranscriptionMessagesUseCase
  private async onError(error: Error, message: TMessage) {
    console.error("Erro de validação:", error);
    await handleMessageError(
      this.messageBroker,
      message,
      "transcription-queue",
      5,
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
