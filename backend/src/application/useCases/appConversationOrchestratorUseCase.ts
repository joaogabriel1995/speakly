import { IWebhookAdapter } from "../interfaces/IWebhookAdapter";
import { messageTypeEnum, WebhookBodySchemaType } from "../schemas/evoluctionWebhookSchema";
import { HandleChatInputUseCase } from "./handleChatInputUseCase";
import { HandleVoiceInputUseCase } from "./handleVoiceInputUseCase";

export class AppConversationOrchestratorUseCase {
  constructor(
    private readonly handleChatInputUseCase: HandleChatInputUseCase,
    private readonly handleVoiceInputUseCase: HandleVoiceInputUseCase,
    private readonly webhookAdapter: IWebhookAdapter<WebhookBodySchemaType>
  ) { }
  async execute(webhookPayloadBody: WebhookBodySchemaType) {
    console.log("ASOIDJAIOSDJ")
    const { messageType } = webhookPayloadBody.data
    if (messageType === messageTypeEnum.enum.conversation) {
      const message = this.webhookAdapter.toMessage(webhookPayloadBody)
      await this.handleChatInputUseCase.execute(message);
    }
    if (messageType === messageTypeEnum.enum.audioMessage) {
      this.handleVoiceInputUseCase.execute(webhookPayloadBody)
    }
  }
}
