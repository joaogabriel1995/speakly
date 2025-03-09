// src/infrastructure/controllers/get-learning-journey-by-id.controller.ts
import {
  IController,
  IRequest,
  IResponse,
} from "../interfaces/adapters/controller.interface";
import { GetLearningJourneyByIdInput } from "../schemas/group-by-learning-journey-by-id-input";
import { GroupBySettingLearningJourneyByIdUseCase } from "../useCases/learningJourney/get-learning-journey.use-case";

export class GetLearningJourneyByIdController implements IController {
  constructor(
    private readonly getLearningJourneyByIdUseCase: GroupBySettingLearningJourneyByIdUseCase,
  ) {}

  async handle(request: IRequest<unknown>): Promise<IResponse<unknown>> {
    try {
      // Os parâmetros chegam em `request.params`
      const input = GetLearningJourneyByIdInput.parse(request.params);

      const learningJourney =
        await this.getLearningJourneyByIdUseCase.execute(input);

      return {
        body: learningJourney,
        statusCode: 200,
      };
    } catch (error: unknown) {
      return {
        body: (error as Error).message,
        statusCode: 400,
      };
    }
  }
}
