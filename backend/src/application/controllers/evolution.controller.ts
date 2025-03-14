import {
  IRequest,
  IResponse,
  IController,
} from "../interfaces/adapters/controller.interface";
import {
  WebhookBodySchema,
  WebhookBodySchemaType,
} from "../schemas/evolution-webhook.schema";
import { AppConversationOrchestratorUseCase } from "../useCases/chat/app-conversation-orchestrator.use-case";

interface ChatResponse {
  id: string;
  content: string;
  timestamp: number;
}

export class EvolutionController
  implements IController<WebhookBodySchemaType, ChatResponse>
{
  constructor(
    private readonly appConversationOrchestratorUseCase: AppConversationOrchestratorUseCase,
  ) {}

  async handle(
    request: IRequest<WebhookBodySchemaType>,
  ): Promise<IResponse<ChatResponse>> {
    try {
      const body = WebhookBodySchema.parse(request.body);
      await this.appConversationOrchestratorUseCase.execute(body);
      return {
        statusCode: 201,
        body: {
          id: "message.id",
          content: "message.getText()",
          timestamp: new Date().getTime(),
        },
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: null,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "WhatsApp processing error",
        },
      };
    }
  }
}
