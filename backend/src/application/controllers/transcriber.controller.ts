import {
  IController,
  IRequest,
  IResponse,
} from "../interfaces/adapters/controller.interface";
import {
  TransctiptionSchema,
  TransctiptionUseCaseDto,
} from "../schemas/transcription.schema";
import { TranscriberUseCase } from "../useCases/transcriber/transcriber.use-case";

// Interface para tipar o corpo da resposta
interface TranscriberResponseDto {
  message: string;
}

export class TranscriberController
  implements IController<TransctiptionUseCaseDto, TranscriberResponseDto>
{
  constructor(private readonly transcriberUseCase: TranscriberUseCase) {}

  async handle(
    request: IRequest<TransctiptionUseCaseDto>,
  ): Promise<IResponse<TranscriberResponseDto>> {
    const body = TransctiptionSchema.parse(request.body);

    await this.transcriberUseCase.execute(body.url);

    return {
      body: { message: "Transcription started successfully" },
      statusCode: 200,
    };
  }
}
