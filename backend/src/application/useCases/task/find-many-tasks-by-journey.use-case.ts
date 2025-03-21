import { TaskEntity } from "../../../domain/entities/task.entity";
import { ITaskRepository } from "../../../domain/repository/task-repository.interface";
import { configService } from "../../../infrastructure/services/config.service";



export class FindManyTasksByJourneyUseCase {
  constructor(private taskRepository: ITaskRepository) { }

  async execute(journeyId: string): Promise<TaskEntity[]> {

    const tasks = await this.taskRepository.findManyByJourney(journeyId);
    if (!tasks) {
      throw new Error("Tasks not found");
    }
    return tasks
  }
}
