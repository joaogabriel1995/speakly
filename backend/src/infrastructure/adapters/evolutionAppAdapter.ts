import { webhookBodySchema } from '../../application/dto/evolutionWebhookDTO';
import { IWebhookAdapter } from '../../application/interfaces/adapters/IWebhookAdapter';
import { Message, SenderType } from '../../domain/entities/message';


export class WhatsAppAdapter implements IWebhookAdapter<webhookBodySchema> {
    constructor() { }

    toMessage(data: webhookBodySchema): Message {
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
