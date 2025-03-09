import WebSocket, { WebSocketServer } from "ws";
import { IMessageBroker } from "./message-broker";

export interface MessageBroker {
  content: object;
}

type Subscription = {
  onMessage: (
    msg: MessageBroker,
    ack: () => void,
    nack: (requeue?: boolean) => void,
  ) => Promise<void>;
  onError: (
    error: Error,
    msg: MessageBroker,
    ack: () => void,
    nack: (requeue?: boolean) => void,
  ) => Promise<void>;
};

export class WebSocketBroker implements IMessageBroker<MessageBroker> {
  private static instance: WebSocketBroker | null = null;
  private wss: WebSocketServer | null = null;
  private clients: Map<string, Map<string, WebSocket>> = new Map(); // userId -> topic -> WebSocket
  private subscriptions: Map<string, Subscription> = new Map(); // queue -> subscription
  private isInitialized = false;

  private constructor(
    private readonly host: string,
    private readonly port: number,
  ) {}

  public static getInstance(host: string, port: number): WebSocketBroker {
    if (!WebSocketBroker.instance) {
      WebSocketBroker.instance = new WebSocketBroker(host, port);
    }
    return WebSocketBroker.instance;
  }

  public async init(): Promise<void> {
    if (this.isInitialized) return;

    try {
      this.wss = new WebSocketServer({ host: this.host, port: this.port });

      this.wss.on("connection", (ws: WebSocket) => {

        ws.on("message", (data: string) => {
          try {
            const parsed = JSON.parse(data);
            if (parsed.queue) {
              // Registro inicial do cliente
              const [userId, topic] = this.parseQueue(parsed.queue);
              if (!this.clients.has(userId)) {
                this.clients.set(userId, new Map());
              }
              this.clients.get(userId)!.set(topic, ws);
            } else {
              // Mensagem normal, processar subscrições
              this.handleMessage(ws, data);
            }
          } catch (error) {
            this.handleError(ws, data, error);
          }
        });

        ws.on("close", () => {
          this.removeClient(ws);
        });

        ws.on("error", (error) => {
          this.removeClient(ws);
        });
      });

      this.isInitialized = true;
    } catch (error) {
      throw new Error(`Failed to initialize WebSocket server: ${error}`);
    }
  }

  public async publish(queue: string, message: object): Promise<void> {
    if (!this.isInitialized || !this.wss) {
      throw new Error("WebSocket server not initialized. Call init() first.");
    }

    try {
      const [userId, topic] = this.parseQueue(queue);
      const messageWithQueue = { queue, content: message }; // Envelopa a mensagem com o queue
      const messageString = JSON.stringify(messageWithQueue);
      const userTopics = this.clients.get(userId);
      const ws = userTopics?.get(topic);

      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(messageString);
      } else {
      }
    } catch (error) {
      throw new Error(`Failed to publish message to ${queue}: ${error}`);
    }
  }

  public async subscribe(
    queue: string,
    onMessage: (
      msg: MessageBroker,
      ack: () => void,
      nack: (requeue?: boolean) => void,
    ) => Promise<void>,
    onError: (
      error: Error,
      msg: MessageBroker,
      ack: () => void,
      nack: (requeue?: boolean) => void,
    ) => Promise<void>,
  ): Promise<void> {
    if (!this.isInitialized || !this.wss) {
      throw new Error("WebSocket server not initialized. Call init() first.");
    }

    this.subscriptions.set(queue, { onMessage, onError });
    console.log(`Subscrição registrada para ${queue}`);
  }

  public async disconnect(): Promise<void> {
    if (this.wss) {
      this.wss.close();
      this.clients.clear();
      this.subscriptions.clear();
      this.isInitialized = false;
      console.log("WebSocketBroker desconectado");
    }
  }

  private parseQueue(queue: string): [string, string] {
    const [userId, topic] = queue.split("/");
    if (!userId || !topic) {
      throw new Error(
        `Invalid queue format: ${queue}. Expected "userId/topic"`,
      );
    }
    return [userId, topic];
  }

  private removeClient(ws: WebSocket): void {
    for (const [userId, topics] of this.clients) {
      for (const [topic, client] of topics) {
        if (client === ws) {
          topics.delete(topic);
          console.log(`Removendo cliente de ${userId}/${topic}`);
          if (topics.size === 0) {
            this.clients.delete(userId);
          }
          break;
        }
      }
    }
  }

  private async handleMessage(
    ws: WebSocket,
    messageString: string,
  ): Promise<void> {
    const queue = this.getQueueFromWebSocket(ws);
    if (!queue) return;

    const subscription = this.subscriptions.get(queue);
    if (!subscription) return;

    const message: MessageBroker = {
      content: JSON.parse(messageString),
    };

    const ack = async () => {};
    const nack = async (requeue?: boolean) => {
      if (requeue && ws.readyState === WebSocket.OPEN) {
        ws.send(messageString);
      }
    };

    await subscription.onMessage(message, ack, nack);
  }

  private async handleError(
    ws: WebSocket,
    messageString: string,
    error: unknown,
  ): Promise<void> {
    const queue = this.getQueueFromWebSocket(ws);
    if (!queue) return;

    const subscription = this.subscriptions.get(queue);
    if (!subscription) return;

    const message: MessageBroker = {
      content: messageString ? JSON.parse(messageString) : {},
    };

    const ack = async () => {};
    const nack = async (requeue?: boolean) => {
      if (requeue && ws.readyState === WebSocket.OPEN) {
        ws.send(messageString);
      }
    };

    await subscription.onError(
      error instanceof Error ? error : new Error(String(error)),
      message,
      ack,
      nack,
    );
  }

  private getQueueFromWebSocket(ws: WebSocket): string | null {
    for (const [userId, topics] of this.clients) {
      for (const [topic, client] of topics) {
        if (client === ws) {
          return `${userId}/${topic}`;
        }
      }
    }
    return null;
  }
}
