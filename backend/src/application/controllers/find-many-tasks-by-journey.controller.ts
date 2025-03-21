import { IController, IRequest, IResponse } from "../interfaces/adapters/controller.interface";
import { FindManyTasksByJourneyUseCase } from "../useCases/task/find-many-tasks-by-journey.use-case";



export class FindManyTasksByJourneyController implements IController<unknown, unknown> {
  constructor(private findManyByJourneyUseCase: FindManyTasksByJourneyUseCase) { }

  async handle(request: IRequest): Promise<IResponse> {
    try {
      request.params = request.params || {};
      const journeyId = request.params.journeyId as string;
      const tasks = await this.findManyByJourneyUseCase.execute(journeyId);
      return tasks ? { statusCode: 200, body: tasks } : { statusCode: 404, body: { message: "Tasks not found" } };
    } catch (error) {
      return error instanceof Error
        ? { statusCode: 400, body: { message: error.message } }
        : { statusCode: 500, body: { message: "Internal server error" } };
    }
  }
}
