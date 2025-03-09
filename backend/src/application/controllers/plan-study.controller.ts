import {
  IController,
  IRequest,
  IResponse,
} from "../interfaces/adapters/controller.interface";
import {
  LearningSettingsInputDto,
  LearningSettingsInputSchema,
} from "../schemas/learning-settings-input.schema";
import { PlanStudyUseCase } from "../useCases/plan-study/study-plan.use-case";

export class PlanStudyController
  implements IController<LearningSettingsInputDto, { message: string }>
{
  constructor(private readonly planStudyUseCase: PlanStudyUseCase) {}
  async handle(
    request: IRequest<LearningSettingsInputDto>,
  ): Promise<IResponse<{ message: string }>> {
    console.log(request.body);
    const body = LearningSettingsInputSchema.parse(request.body);

    await this.planStudyUseCase.execute(body);
    return {
      body: { message: "Plan study processing started successfully" },
      statusCode: 200,
    };
  }
}
