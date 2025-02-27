import amqp, { Connection, Channel, Message, Options } from 'amqplib';
import { IMessageBroker } from './IMessageBroker';

export class RabbitMQBrokerAdvanced implements IMessageBroker {
  private static instance: RabbitMQBrokerAdvanced | null = null;
  private connection: Connection | null = null;
  private channel: Channel | null = null;
  private replyQueue: string | null = null;
  private isInitialized = false;

  private constructor(private readonly uri: string) { }

  public static getInstance(uri: string): RabbitMQBrokerAdvanced {
    if (!RabbitMQBrokerAdvanced.instance) {
      RabbitMQBrokerAdvanced.instance = new RabbitMQBrokerAdvanced(uri);
    }
    return RabbitMQBrokerAdvanced.instance;
  }

  public static resetInstance(): void {
    RabbitMQBrokerAdvanced.instance = null;
  }

  public async init(): Promise<void> {
    if (this.isInitialized) return;

    this.connection = await amqp.connect(this.uri);
    this.channel = await this.connection.createChannel();

    const { queue } = await this.channel.assertQueue('', { exclusive: true });
    this.replyQueue = queue;
    this.isInitialized = true;

    this.connection.on('error', (err) => {
      console.error('RabbitMQ connection error:', err);
      this.isInitialized = false;
      this.channel = null;
      this.connection = null;
    });
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.isInitialized || !this.channel) {
      await this.init();
    }
    if (!this.channel) {
      throw new Error('Channel not initialized');
    }
  }

  public async ack(msg: Message): Promise<void> {
    await this.ensureInitialized();
    this.channel!.ack(msg);
  }

  public async nack(msg: Message, requeue: boolean = true): Promise<void> {
    await this.ensureInitialized();
    this.channel!.nack(msg, false, requeue);
  }

  public async publish(queue: string, message: object, options?: Options.Publish): Promise<void> {
    await this.ensureInitialized();
    await this.channel!.assertQueue(queue, { durable: true });
    this.channel!.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { ...options, persistent: true });
  }

  public async subscribe(
    queue: string,
    onMessage: (msg: Message, ack: () => void, nack: (requeue?: boolean) => void) => Promise<void>,
    onError: (error: Error, msg: Message, ack: () => void, nack: (requeue?: boolean) => void) => Promise<void>
  ): Promise<void> {
    await this.ensureInitialized();
    await this.channel!.assertQueue(queue, { durable: true });

    await this.channel!.consume(
      queue,
      async (msg: Message | null) => {
        if (!msg) return;

        const ack = () => this.ack(msg);
        const nack = (requeue: boolean = true) => this.nack(msg, requeue);

        try {
          await onMessage(msg, ack, nack);
        } catch (error) {
          console.error('Error processing message:', error);
          const err = error instanceof Error ? error : new Error('Unknown error');
          await onError(err, msg, ack, nack);
        }
      },
      { noAck: false }
    );
  }

  public async close(): Promise<void> {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
    this.isInitialized = false;
  }
}
