import { ListeningLeason } from "../../../domain/entities/listening-leason.entity";
import { TaskEntity } from "../../../domain/entities/task.entity";
import { IListeningLeasonRepository } from "../../../domain/repository/listening-leason-repository.interface";
import { ITaskRepository } from "../../../domain/repository/task-repository.interface";
import { configService } from "../../../infrastructure/services/config.service";



export class GetListeningLeasonByIdUseCase {
  constructor(private listeningLeasonRepository: IListeningLeasonRepository) { }

  async execute(id: string): Promise<ListeningLeason> {

    const tasks = await this.listeningLeasonRepository.findByID(id);
    if (!tasks) {
      throw new Error("Tasks not found");
    }
    return tasks
  }
}
