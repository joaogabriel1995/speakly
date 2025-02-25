import { IMediaMessageService } from "../../domain/services/MediaMessageService";
import { IMessageBroker } from "../../infrastructure/messaging/IMessageBroker";
import { RabbitMQBrokerAdvanced } from "../../infrastructure/messaging/RabbitMQBroker";
import { WebhookBodySchemaType } from "../schemas/evoluctionWebhookSchema";




export class HandleVoiceInputUseCase {
    constructor(
      private mediaMessageService: IMediaMessageService,
      private messageBroker: IMessageBroker

    ) { }

    async execute(webhookPayloadBody: WebhookBodySchemaType): Promise<void> {
        const { instance, apikey } = webhookPayloadBody
        const { id } = webhookPayloadBody.data.key
        const media = await this.mediaMessageService.getBase64FromMediaMessage(instance, id, apikey);
        console.log(media)
        await this.messageBroker.publish('transcription_queue_base64', media)
        // const message = new Message(media);
    }
}


