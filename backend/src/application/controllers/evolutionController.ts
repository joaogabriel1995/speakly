import { Request, Response, Controller } from '../../application/interfaces/Controller';
import { webhookBodySchema, WebhookBodySchemaType } from '../schemas/evoluctionWebhookSchema';
import { AppConversationOrchestratorUseCase } from '../useCases/appConversationOrchestratorUseCase';

interface ChatResponse {
    id: string;
    content: string;
    timestamp: number;
}

export class EvolutionController implements Controller<WebhookBodySchemaType, ChatResponse> {
    constructor(
        private readonly appConversationOrchestratorUseCase: AppConversationOrchestratorUseCase,
    ) { }

    async handle(request: Request<WebhookBodySchemaType>): Promise<Response<ChatResponse>> {
        try {
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
