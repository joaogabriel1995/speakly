import { Message } from "../../../domain/entities/Message";

export interface IWebhookAdapter<T> {
    toMessage(data: T): Message;
}
