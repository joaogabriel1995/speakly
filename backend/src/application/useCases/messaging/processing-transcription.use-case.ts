// src/application/useCases/messaging/ProcessQueueMessagesUseCase.ts
import { z } from 'zod';
import { IMessageBroker } from '../../../infrastructure/messaging/message-broker';

// Schema de exemplo para mensagens da fila (pode ser movido para fora ou parametrizado)
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
    private readonly messageBroker: IMessageBroker<TMessage>,// TMessage é genérico,
    private readonly wsBroker: IMessageBroker<TMessage> // TMessage é genérico,

  ) { }

  private async onMessage(message: TMessage) {


    const data = this.extractContent(message);
    try {
      const transcriptionData = queueMessageSchema.parse(data);
      console.log('Mensagem validada:', transcriptionData);
      if (this.messageBroker.ack) {
        await this.wsBroker.publish(`${transcriptionData.userId}/transcription`, { ...transcriptionData });
        await this.wsBroker.publish(`${transcriptionData.userId}/alert`, { text: "Transcrição Concluida" });
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
        'transcription-queue',
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
