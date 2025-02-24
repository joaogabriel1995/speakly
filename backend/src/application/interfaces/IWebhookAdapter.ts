import { Message } from "../../domain/entities/message";

export interface IWebhookAdapter<T> {
    toMessage(data: T): Message;
}
