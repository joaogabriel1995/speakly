import { TaskEntity } from "../entities/task.entity";

export interface ITaskRepository {
  save(message: TaskEntity): Promise<void>;
}
