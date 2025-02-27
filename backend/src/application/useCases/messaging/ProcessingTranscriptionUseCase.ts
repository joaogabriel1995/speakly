// src/application/useCases/messaging/ProcessQueueMessagesUseCase.ts
import { z } from 'zod';
import { IMessageBroker } from '../../../infrastructure/messaging/IMessageBroker';
import { Message } from "amqplib";


// Schema de exemplo para mensagens da fila
const queueMessageSchema = z.object({
  transcriptionId: z.string(),
  text: z.string(),
});
type QueueMessage = z.infer<typeof queueMessageSchema>;

export class ProcessQueueMessagesUseCase {
  constructor(
    private readonly messageBroker: IMessageBroker,
  ) { }


  private async onMessage(message: Message) {
    const data = JSON.parse(message.content.toString())
    const transcriptionData = queueMessageSchema.parse(data)
    console.log(transcriptionData)
    this.messageBroker.ack(message)
  }
  private async onError(error: Error, message: Message) {
    const maxAttempts = 5;
    let attempts = 0;
    if (message.properties.headers && message.properties.headers['attempts']) {
      attempts = parseInt(message.properties.headers['attempts'], 10);
    }
    attempts++; // Inc
    if (attempts >= maxAttempts) {
      this.messageBroker.nack(message, false)
    } else {
      this.messageBroker.ack(message)
      await this.messageBroker.publish("transcription-queue", message, { headers: { attempts } })
    }

  }

  public async execute(queue: string): Promise<void> {
    await this.messageBroker.subscribe(
      queue,
      (message) => this.onMessage(message),
      (error, message) => this.onError(error, message)
    )
  }
}
