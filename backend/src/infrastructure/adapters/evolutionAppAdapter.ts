import { EvolutionWebhookBodyDTO } from '../../application/dto/evolutionWebhookDTO';
import { IWebhookAdapter } from '../../application/interfaces/IWebhookAdapter';
import { Message, SenderType } from '../../domain/entities/message';


export class WhatsAppAdapter implements IWebhookAdapter<EvolutionWebhookBodyDTO> {
    constructor() { }

    toMessage(data: EvolutionWebhookBodyDTO): Message {
        try {

            const message = new Message({
                text: data.data.message.conversation,
                sender: data.sender,
                senderType: SenderType.USER,
                timestamp: new Date(data.date_time)

            })
            return message

        } catch (error) {

            return new Message({
                text: data.data.message.conversation,
                sender: data.sender,
                senderType: SenderType.USER,
                timestamp: new Date(data.date_time)

            })
        }

    }
}
