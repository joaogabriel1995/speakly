import { Message } from "../../domain/entities/message";
import { Request, Response } from "./Controller";

export interface IWebhookAdapter<T> {
    toMessage(data: T): Message;
}
