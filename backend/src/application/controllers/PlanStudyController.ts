import { IController, IRequest, IResponse } from "../interfaces/adapters/IController";
import { PlanStudySchema, PlanStudyUseCaseDto } from "../schemas/PlanStudySchema";
import { PlanStudyUseCase } from "../useCases/plan-study/StudyPlan";



export class PlanStudyController implements IController<PlanStudyUseCaseDto, void> {
  constructor(
    private readonly planStudyUseCase: PlanStudyUseCase) { }
  async handle(request: IRequest<PlanStudyUseCaseDto>): Promise<IResponse<void>> {

    const body = PlanStudySchema.parse(request.body)

    await this.planStudyUseCase.execute(body)
    return {
      body: null,
      statusCode: 200
    }
  }
}
