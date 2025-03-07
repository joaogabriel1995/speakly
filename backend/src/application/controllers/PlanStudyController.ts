import { IController, IRequest, IResponse } from "../interfaces/adapters/IController";
import { LearningSettingsInputDto, LearningSettingsInputSchema } from "../schemas/LearningSettingsInputSchema";
import { PlanStudyUseCase } from "../useCases/plan-study/StudyPlan";



export class PlanStudyController implements IController<LearningSettingsInputDto, void> {
  constructor(
    private readonly planStudyUseCase: PlanStudyUseCase) { }
  async handle(request: IRequest<LearningSettingsInputDto>): Promise<IResponse<void>> {
    console.log(request.body)
    const body = LearningSettingsInputSchema.parse(request.body)

    await this.planStudyUseCase.execute(body)
    return {
      body: null,
      statusCode: 200
    }
  }
}
