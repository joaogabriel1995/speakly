import { IWebhookAdapter } from "../../interfaces/adapters/webhook-adapter.interface";
import {
  MessageTypeEnum,
  WebhookBodySchemaType,
} from "../../schemas/evolution-webhook.schema";
import { HandleVoiceInputUseCase } from "../voice/handle-voice-input.use-case";
import { HandleChatInputUseCase } from "./handle-chat-input.use-case";

export class AppConversationOrchestratorUseCase {
  constructor(
    private readonly handleChatInputUseCase: HandleChatInputUseCase,
    private readonly handleVoiceInputUseCase: HandleVoiceInputUseCase,
    private readonly webhookAdapter: IWebhookAdapter<WebhookBodySchemaType>,
  ) {}
  async execute(webhookPayloadBody: WebhookBodySchemaType) {
    const { messageType } = webhookPayloadBody.data;
    if (messageType === MessageTypeEnum.enum.conversation) {
      const message = this.webhookAdapter.toMessage(webhookPayloadBody);
      await this.handleChatInputUseCase.execute(message);
    }
    if (messageType === MessageTypeEnum.enum.audioMessage) {
      this.handleVoiceInputUseCase.execute(webhookPayloadBody);
    }
  }
}
