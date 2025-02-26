import { IController, IRequest, IResponse } from "../interfaces/adapters/IController";
import { TransctiptionSchema, TransctiptionUseCaseDto } from "../schemas/TranscriptionSchema";
import { TranscriberUseCase } from "../useCases/transcriber/TranscriberUseCase";



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
