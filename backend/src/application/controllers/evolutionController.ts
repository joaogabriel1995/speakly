import { EvolutionWebhookBodyDTO, EvolutionWebhookDTO } from '../../application/dto/evolutionWebhookDTO';
import { HandleChatInputUseCase } from '../../application/useCases/handleChatInputUseCase';
import { Request, Response, Controller } from '../../application/interfaces/Controller';
import { IWebhookAdapter } from '../interfaces/IWebhookAdapter';
import { z } from 'zod';
import { webhookBodySchema } from '../schemas/evoluctionWebhookSchema';

interface ChatResponse {
    id: string;
    content: string;
    timestamp: number;
}

export class EvolutionController implements Controller<EvolutionWebhookBodyDTO, ChatResponse> {
    constructor(
        private readonly handleChatInputUseCase: HandleChatInputUseCase,
        private readonly webhookAdapter: IWebhookAdapter<EvolutionWebhookBodyDTO>

    ) { }

    async handle(request: Request<EvolutionWebhookBodyDTO>): Promise<Response<ChatResponse>> {
        try {
            const body = webhookBodySchema.parse(request.body)
            const message = this.webhookAdapter.toMessage(body)
            await this.handleChatInputUseCase.execute(message);
            return {
                statusCode: 201,
                body: {
                    id: message.id,
                    content: message.getText(),
                    timestamp: new Date().getTime(),
                },
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: null,
                error: { message: error instanceof Error ? error.message : 'WhatsApp processing error' },
            };
        }
    }
}
