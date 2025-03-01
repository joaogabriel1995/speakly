import WebSocket, { WebSocketServer } from 'ws';
import { IMessageBroker } from './IMessageBroker';

export interface MessageBroker {
  content: object;
}

export class WebSocketBroker implements IMessageBroker<MessageBroker> {
  private static instance: WebSocketBroker | null = null;
  private wss: WebSocketServer | null = null;
  private clients: Map<string, WebSocket> = new Map(); // Map de userId para WebSocket
  private isInitialized = false;

  private constructor(
    private readonly host: string,
    private readonly port: number
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

      this.wss.on('connection', (ws: WebSocket) => {
        console.log('Novo cliente conectado!');

        ws.on('message', (data: string) => {
          try {
            const { userId } = JSON.parse(data);
            if (userId) {
              this.clients.set(userId, ws);
              console.log(`Cliente registrado com userId: ${userId}`);
            } else {
              console.warn('Mensagem recebida sem userId:', data);
            }
          } catch (error) {
            console.error('Erro ao processar mensagem do cliente:', error);
          }
        });

        ws.on('close', () => {
          this.removeClient(ws);
        });

        ws.on('error', (error) => {
          console.error('Erro no WebSocket:', error);
          this.removeClient(ws);
        });
      });

      this.isInitialized = true;
      console.log(`WebSocketBroker iniciado em ${this.host}:${this.port}`);
    } catch (error) {
      throw new Error(`Failed to initialize WebSocket server: ${error}`);
    }
  }

  public async publish(userId: string, message: object): Promise<void> {
    if (!this.isInitialized || !this.wss) {
      throw new Error('WebSocket server not initialized. Call init() first.');
    }

    try {
      const messageString = JSON.stringify(message);
      const ws = this.clients.get(userId); // Buscar pelo userId

      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(messageString);
        console.log(`Mensagem enviada para userId: ${userId}`);
      } else {
        console.warn(`Nenhum cliente ativo para userId: ${userId}`);
      }
    } catch (error) {
      throw new Error(`Failed to publish message: ${error}`);
    }
  }

  public async subscribe(
    userId: string,
    onMessage: (
      msg: MessageBroker,
      ack: () => void,
      nack: (requeue?: boolean) => void
    ) => Promise<void>,
    onError: (
      error: Error,
      msg: MessageBroker,
      ack: () => void,
      nack: (requeue?: boolean) => void
    ) => Promise<void>
  ): Promise<void> {
    if (!this.isInitialized || !this.wss) {
      throw new Error('WebSocket server not initialized. Call init() first.');
    }

    try {
      this.wss.on('connection', (ws: WebSocket) => {
        ws.on('message', async (messageString: string) => {
          try {
            const message: MessageBroker = {
              content: JSON.parse(messageString)
            };

            const ack = async () => {
              // No WebSocket puro, ack é no-op, mas poderia logar ou fechar conexão
            };

            const nack = async (requeue?: boolean) => {
              if (requeue && ws.readyState === WebSocket.OPEN) {
                ws.send(messageString);
              }
            };

            await onMessage(message, ack, nack);
          } catch (error) {
            const message: MessageBroker = {
              content: messageString ? JSON.parse(messageString) : {}
            };

            const ack = async () => {};
            const nack = async (requeue?: boolean) => {
              if (requeue && ws.readyState === WebSocket.OPEN) {
                ws.send(messageString);
              }
            };

            await onError(
              error instanceof Error ? error : new Error(String(error)),
              message,
              ack,
              nack
            );
          }
        });
      });
    } catch (error) {
      throw new Error(`Failed to subscribe to userId ${userId}: ${error}`);
    }
  }

  public async disconnect(): Promise<void> {
    if (this.wss) {
      this.wss.close();
      this.clients.clear();
      this.isInitialized = false;
      console.log('WebSocketBroker desconectado');
    }
  }

  private removeClient(ws: WebSocket): void {
    for (const [userId, client] of this.clients) {
      if (client === ws) {
        console.log(`Removendo cliente com userId: ${userId}`);
        this.clients.delete(userId);
        break;
      }
    }
  }
}
