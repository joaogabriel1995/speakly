import { IRequest, IResponse, IController } from '../interfaces/adapters/IController';
import { webhookBodySchema, WebhookBodySchemaType } from '../schemas/EvolutionWebhookSchema';
import { AppConversationOrchestratorUseCase } from '../useCases/chat/AppConversationOrchestratorUseCase';

interface ChatResponse {
    id: string;
    content: string;
    timestamp: number;
}

export class EvolutionController implements IController<WebhookBodySchemaType, ChatResponse> {
    constructor(
        private readonly appConversationOrchestratorUseCase: AppConversationOrchestratorUseCase,
    ) { }

    async handle(request: IRequest<WebhookBodySchemaType>): Promise<IResponse<ChatResponse>> {
        try {
          console.log('request.body', request.body)
            const body = webhookBodySchema.parse(request.body)
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
            console.log(error)
            return {
                statusCode: 500,
                body: null,
                error: { message: error instanceof Error ? error.message : 'WhatsApp processing error' },
            };
        }
    }
}
