import { IController, IRequest, IResponse } from "../interfaces/adapters/controller.interface";
import { CreateDetailedLearningPlanUseCase } from "../useCases/learning-detail/create-detailed-learning-plan.use-case";
import { CreateDetailedLearningPlanInputDto } from "../schemas/create-detail-learning-plan.schema";


export class CreateDetailedLearningPlanController implements IController<CreateDetailedLearningPlanInputDto, string> {
  constructor(private createDetailedLearningPlanUseCase: CreateDetailedLearningPlanUseCase) { }
  async handle(request: IRequest<CreateDetailedLearningPlanInputDto>): Promise<IResponse<string>> {
    const { activities, objective, settingId, theory, learningDetailId } = request.body;
    await this.createDetailedLearningPlanUseCase.execute({ activities, objective, settingId, theory, learningDetailId })
    return {
      body: "Plano de aprendizagem detalhado criado com sucesso",
      statusCode: 200,
    }
  }

}
