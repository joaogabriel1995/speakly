import amqp, { Connection, Channel, Message } from 'amqplib';
import { IMessageBroker } from './IMessageBroker';

export class RabbitMQBrokerAdvanced implements IMessageBroker {
  private static instance: RabbitMQBrokerAdvanced | null = null;
  private connection: Connection | null = null;
  private channel: Channel | null = null;
  private replyQueue: string | null = null;
  private isInitialized = false;

  private constructor(private readonly uri: string) { }

  // Método para obter a instância Singleton
  public static getInstance(uri: string): RabbitMQBrokerAdvanced {
    if (!RabbitMQBrokerAdvanced.instance) {
      RabbitMQBrokerAdvanced.instance = new RabbitMQBrokerAdvanced(uri);
    }
    return RabbitMQBrokerAdvanced.instance;
  }

  // Método para resetar a instância (útil para testes ou reinicialização)
  public static resetInstance(): void {
    RabbitMQBrokerAdvanced.instance = null;
  }

  public async init(): Promise<void> {
    if (this.isInitialized) return; // Evita reinicialização desnecessária

    this.connection = await amqp.connect(this.uri);
    this.channel = await this.connection.createChannel();

    const { queue } = await this.channel.assertQueue('', { exclusive: true });
    this.replyQueue = queue;
    this.isInitialized = true;

    // Lida com reconexão em caso de falha
    this.connection.on('error', (err) => {
      console.error('RabbitMQ connection error:', err);
      this.isInitialized = false;
      this.channel = null;
      this.connection = null;
    });
  }

  public async publish(queue: string, message: object): Promise<void> {
    await this.ensureInitialized();
    await this.channel!.assertQueue(queue, { durable: true });
    this.channel!.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
  }

  public async subscribe(queue: string, onMessage: (message: object) => Promise<void>): Promise<void> {
    await this.ensureInitialized();
    await this.channel!.assertQueue(queue, { durable: true });
    await this.channel!.consume(queue, async (msg: Message | null) => {
      if (msg) {
        try {
          const content = JSON.parse(msg.content.toString());
          await onMessage(content);
          this.channel!.ack(msg);
        } catch (error) {
          console.error('Error processing message:', error);
          this.channel!.nack(msg, false, false);
        }
      }
    });
  }

  // Garantir que o canal esteja inicializado antes de qualquer operação
  private async ensureInitialized(): Promise<void> {
    if (!this.isInitialized || !this.channel) {
      await this.init();
    }
    if (!this.channel) {
      throw new Error('Channel not initialized');
    }
  }

  // Método para fechar a conexão (opcional, para cleanup)
  public async close(): Promise<void> {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
    this.isInitialized = false;
  }
}

// Exemplo de uso
(async () => {
  const broker = RabbitMQBrokerAdvanced.getInstance('amqp://localhost');
  await broker.init();

  await broker.publish('test_queue', { message: 'Hello, RabbitMQ!' });

  await broker.subscribe('test_queue', async (msg) => {
    console.log('Received:', msg);
  });
})();
