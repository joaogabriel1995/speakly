import { Message } from "../../../domain/entities/message.entity";

export interface IWebhookAdapter<T> {
    toMessage(data: T): Message;
}
