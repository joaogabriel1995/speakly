import { IMessageBroker } from "./message-broker";

export function extractContent<TMessage>(message: TMessage): object {
  if ("content" in (message as any)) {
    return JSON.parse((message as any).content.toString("utf-8"));
  }
  throw new Error("Message format not supported: missing content");
}

export function getAttempts<TMessage>(message: TMessage): number {
  if ("properties" in (message as any) && (message as any).properties.headers) {
    return parseInt((message as any).properties.headers["attempts"], 10) || 0;
  }
  return 0;
}

export async function handleMessageError<TMessage>(
  messageBroker: IMessageBroker<TMessage>,
  message: TMessage,
  queue: string,
  maxAttempts: number,
): Promise<void> {
  const attempts = getAttempts(message);

  if (attempts >= maxAttempts) {
    if (messageBroker.nack) {
      await messageBroker.nack(message, false);
    }
  } else {
    if (messageBroker.ack) {
      await messageBroker.ack(message);
    }
    await messageBroker.publish(queue, extractContent(message), {
      headers: { attempts: attempts + 1 },
    });
  }
}
