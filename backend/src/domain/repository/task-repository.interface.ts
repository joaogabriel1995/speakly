import { TaskEntity } from "../entities/task.entity";

export interface ITaskRepository {
  createMany(message: TaskEntity[]): Promise<TaskEntity[]>;
  findManyByJourney(journeyId: string): Promise<TaskEntity[]>;
}
