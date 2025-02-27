import { Message, Options } from "amqplib";

export interface IMessageBroker {
  publish(queue: string, message: object, options?: Options.Publish): Promise<void>;
  subscribe(
    queue: string,
    onMessage: (msg: Message, ack: () => void, nack: (requeue?: boolean) => void) => Promise<void>,
    onError: (error: Error, msg: Message, ack: () => void, nack: (requeue?: boolean) => void) => Promise<void>
  ): Promise<void>
  ack(msg: Message): Promise<void>
  nack(msg: Message, requeue: boolean): Promise<void>

  // // Operações para exchanges
  // publishToExchange(
  //   exchange: string,
  //   routingKey: string,
  //   message: object,
  //   exchangeType?: string
  // ): Promise<void>;
  // subscribeToExchange(
  //   exchange: string,
  //   queue: string,
  //   routingKey: string,
  //   onMessage: (message: object) => Promise<void>,
  //   exchangeType?: string
  // ): Promise<void>;

  // // Método para chamada RPC
  // rpcCall(queue: string, message: object, timeout?: number): Promise<any>;
}
