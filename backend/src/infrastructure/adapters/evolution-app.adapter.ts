import { IWebhookAdapter } from '../../application/interfaces/adapters/webhook-adapter.interface';
import { WebhookBodySchemaType } from '../../application/schemas/evolution-webhook.schema';
import { Message, SenderType } from '../../domain/entities/message.entity';


export class WhatsAppAdapter implements IWebhookAdapter<WebhookBodySchemaType> {
    constructor() { }

    toMessage(data: WebhookBodySchemaType): Message {
        try {
            const message = new Message({
                text: data.data.message.conversation ?? "",
                sender: data.sender,
                senderType: SenderType.USER,
                timestamp: new Date(data.date_time)

            })
            return message

        } catch (error) {

            return new Message({
                text: data.data.message.conversation ?? "",
                sender: data.sender,
                senderType: SenderType.USER,
                timestamp: new Date(data.date_time)

            })
        }

    }
}
