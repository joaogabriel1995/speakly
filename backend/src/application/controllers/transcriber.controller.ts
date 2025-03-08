import { IController, IRequest, IResponse } from "../interfaces/adapters/controller.interface";
import { TransctiptionSchema, TransctiptionUseCaseDto } from "../schemas/transcription.schema";
import { TranscriberUseCase } from "../useCases/transcriber/transcriber.use-case";



export class TranscriberController implements IController<TransctiptionUseCaseDto, void> {
  constructor(
    private readonly transcriberUseCase: TranscriberUseCase) { }
  async handle(request: IRequest<TransctiptionUseCaseDto>): Promise<IResponse<void>> {

    const body = TransctiptionSchema.parse(request.body)

    await this.transcriberUseCase.execute(body.url)
    return {
      body: null,
      statusCode: 200
    }
  }
}
