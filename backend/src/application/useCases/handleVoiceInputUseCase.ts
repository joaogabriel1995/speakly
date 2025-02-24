import { IMediaMessageService } from "../../domain/services/MediaMessageService";
import { WebhookBodySchemaType } from "../schemas/evoluctionWebhookSchema";


export class HandleVoiceInputUseCase {
    constructor(private mediaMessageService: IMediaMessageService) { }

    async execute(webhookPayloadBody: WebhookBodySchemaType): Promise<void> {
        const { instance, apikey } = webhookPayloadBody
        const { id } = webhookPayloadBody.data.key
        const media = await this.mediaMessageService.getBase64FromMediaMessage(instance, id, apikey);
        console.log(media)
        // const message = new Message(media);
    }
}


