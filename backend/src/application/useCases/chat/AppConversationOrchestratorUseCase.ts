import { IWebhookAdapter } from "../../interfaces/adapters/IWebhookAdapter";
import { MessageTypeEnum, WebhookBodySchemaType } from "../../schemas/EvolutionWebhookSchema";
import { HandleVoiceInputUseCase } from "../voice/HandleVoiceInputUseCase";
import { HandleChatInputUseCase } from "./HandleChatInputUseCase";

export class AppConversationOrchestratorUseCase {
  constructor(
    private readonly handleChatInputUseCase: HandleChatInputUseCase,
    private readonly handleVoiceInputUseCase: HandleVoiceInputUseCase,
    private readonly webhookAdapter: IWebhookAdapter<WebhookBodySchemaType>
  ) { }
  async execute(webhookPayloadBody: WebhookBodySchemaType) {
    const { messageType } = webhookPayloadBody.data
    if (messageType === MessageTypeEnum.enum.conversation) {
      const message = this.webhookAdapter.toMessage(webhookPayloadBody)
      await this.handleChatInputUseCase.execute(message);
    }
    if (messageType === MessageTypeEnum.enum.audioMessage) {
      this.handleVoiceInputUseCase.execute(webhookPayloadBody)
    }
  }
}
