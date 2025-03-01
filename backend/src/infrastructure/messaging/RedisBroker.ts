import { createClient, RedisClientType } from "redis";
import { IMessageBroker } from "./IMessageBroker";

export interface Message {
  content: object;
}

export class RedisBroker implements IMessageBroker<Message> {
  private static instance: RedisBroker | null = null;
  private publisher: RedisClientType | null = null;
  private subscriber: RedisClientType | null = null;
  private isInitialized = false;

  private constructor(
    private readonly host: string,
    private readonly port: number
  ) { }

  public static getInstance(host: string, port: number): RedisBroker {
    if (!RedisBroker.instance) {
      RedisBroker.instance = new RedisBroker(host, port);
    }
    return RedisBroker.instance;
  }

  public async init(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Criar clientes separados para publish e subscribe
      this.publisher = createClient({
        socket: {
          host: this.host,
          port: this.port
        }
      });

      this.subscriber = createClient({
        socket: {
          host: this.host,
          port: this.port
        }
      });

      // Conectar ambos os clientes
      await Promise.all([
        this.publisher.connect(),
        this.subscriber.connect()
      ]);

      this.isInitialized = true;
    } catch (error) {
      throw new Error(`Failed to initialize Redis clients: ${error}`);
    }
  }

  public async publish(queue: string, message: object): Promise<void> {
    if (!this.isInitialized || !this.publisher) {
      throw new Error("Redis client not initialized. Call init() first.");
    }

    try {
      const messageString = JSON.stringify(message);
      await this.publisher.publish(queue, messageString);
    } catch (error) {
      throw new Error(`Failed to publish message: ${error}`);
    }
  }

  public async subscribe(
    queue: string,
    onMessage: (
      msg: Message,
      ack: () => void,
      nack: (requeue?: boolean) => void
    ) => Promise<void>,
    onError: (
      error: Error,
      msg: Message,
      ack: () => void,
      nack: (requeue?: boolean) => void
    ) => Promise<void>
  ): Promise<void> {
    if (!this.isInitialized || !this.subscriber) {
      throw new Error("Redis client not initialized. Call init() first.");
    }

    try {
      await this.subscriber.subscribe(queue, async (messageString) => {
        try {
          const message: Message = {
            content: JSON.parse(messageString)
          };
          const ack = async () => {
          };

          const nack = async (requeue?: boolean) => {

            if (requeue && this.publisher) {
              await this.publisher.publish(queue, messageString);
            }
          };

          await onMessage(message, ack, nack);
        } catch (error) {
          const message: Message = {
            content: messageString ? JSON.parse(messageString) : {}
          };

          const ack = async () => { };
          const nack = async (requeue?: boolean) => {
            if (requeue && this.publisher) {
              await this.publisher.publish(queue, messageString);
            }
          };

          await onError(error instanceof Error ? error : new Error(String(error)),
            message,
            ack,
            nack);
        }
      });
    } catch (error) {
      throw new Error(`Failed to subscribe to queue ${queue}: ${error}`);
    }
  }

  // Método para desconectar os clientes (opcional)
  public async disconnect(): Promise<void> {
    if (this.publisher) await this.publisher.quit();
    if (this.subscriber) await this.subscriber.quit();
    this.isInitialized = false;
  }
}
