import { LearningSettingsEntity } from "../../domain/entities/learning-settings.entity";
import {
  IController,
  IRequest,
  IResponse,
} from "../interfaces/adapters/controller.interface";
import { LearningSettingsInputSchema } from "../schemas/learning-settings-input.schema";
import { ListLearningSettingsInputDto, ListLearningSettingsInputSchema } from "../schemas/list-learning-settings-input.schema";
import { ListLearningSettingsByUserUseCase } from "../useCases/learningSettings/list-learning-settings-by-user.use-case";

export class ListLearningSettingsController implements IController<ListLearningSettingsInputDto, LearningSettingsEntity[]> {
  constructor(
    private readonly listLearningSettingsByUser: ListLearningSettingsByUserUseCase,
  ) { }

  async handle(request: IRequest<ListLearningSettingsInputDto>): Promise<IResponse<LearningSettingsEntity[]>> {
    const body = ListLearningSettingsInputSchema.parse(request.body);

    const listSettings = await this.listLearningSettingsByUser.execute(
      body.userId,
    );
    return {
      body: listSettings,
      statusCode: 200,
    };
  }
}
