// src/core/ports/IMessageBroker.ts
export interface IMessageBroker {
  publish(queue: string, message: object): Promise<void>;
  subscribe(queue: string, onMessage: (message: object) => Promise<void>): Promise<void>;

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
