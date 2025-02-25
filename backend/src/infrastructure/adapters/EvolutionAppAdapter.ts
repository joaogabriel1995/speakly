import { IWebhookAdapter } from '../../application/interfaces/adapters/IWebhookAdapter';
import { WebhookBodySchemaType } from '../../application/schemas/EvolutionWebhookSchema';
import { Message, SenderType } from '../../domain/entities/Message';


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
