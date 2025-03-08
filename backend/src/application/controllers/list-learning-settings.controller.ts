import {
  IController,
  IRequest,
  IResponse,
} from "../interfaces/adapters/controller.interface";
import { LearningSettingsInputSchema } from "../schemas/learning-settings-input.schema";
import { ListLearningSettingsInputSchema } from "../schemas/list-learning-settings-input.schema";
import { ListLearningSettingsByUser } from "../useCases/learningSettings/list-learning-settings-by-user.use-case";

export class ListLearningSettingsController implements IController {
  constructor(
    private readonly listLearningSettingsByUser: ListLearningSettingsByUser,
  ) {}

  async handle(request: IRequest<unknown>): Promise<IResponse<unknown>> {
    console.log(request.body);
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
