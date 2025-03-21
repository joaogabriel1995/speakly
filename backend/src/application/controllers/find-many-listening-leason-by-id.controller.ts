import { IController, IRequest, IResponse } from "../interfaces/adapters/controller.interface";
import { GetListeningLeasonByIdUseCase } from "../useCases/listening-leason/find-many-listening-leason-by-id.use-case";
import { FindManyTasksByJourneyUseCase } from "../useCases/task/find-many-tasks-by-journey.use-case";



export class GetListeningLeasonByIdController implements IController<unknown, unknown> {
  constructor(private getListeningLeasonByIdUseCase: GetListeningLeasonByIdUseCase) { }

  async handle(request: IRequest): Promise<IResponse> {
    try {
      request.params = request.params || {};
      const id = request.params.id as string;
      console.log(id)
      const tasks = await this.getListeningLeasonByIdUseCase.execute(id);
      return tasks ? { statusCode: 200, body: tasks } : { statusCode: 404, body: { message: "Listening Leason not found" } };
    } catch (error) {
      return error instanceof Error
        ? { statusCode: 400, body: { message: error.message } }
        : { statusCode: 500, body: { message: "Internal server error" } };
    }
  }
}
