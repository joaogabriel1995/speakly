
export interface IMessageBroker<TMessage = unknown, TOptions = unknown> {
  publish(queue: string, message: object, options?: TOptions): Promise<void>;

  subscribe(
    queue: string,
    onMessage: (msg: TMessage, ack: () => void, nack: (requeue?: boolean) => void) => Promise<void>,
    onError: (error: Error, msg: TMessage, ack: () => void, nack: (requeue?: boolean) => void) => Promise<void>
  ): Promise<void>;

  ack?(msg: TMessage): Promise<void>;
  nack?(msg: TMessage, requeue: boolean): Promise<void>;
}
