import { TaskEntity, TaskStatusEnum } from "../../../domain/entities/task.entity";
import { ITaskRepository } from "../../../domain/repository/task-repository.interface";
import { DailyActivity, DailyActivityWithContent } from "../../schemas/process-detail-learning-messages-schema";



export class CreateManyTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {

  }
  async execute(dailyActivityInput: DailyActivity[], learningJourneyId: string, day: number): Promise<TaskEntity[]> {
    const tasks = dailyActivityInput.map((dailyActivity) => {
      return new TaskEntity({
        task: dailyActivity.task,
        duration: dailyActivity.duration,
        repetitions: dailyActivity.repetitions,
        resource: dailyActivity.resource,
        skill: dailyActivity.skill,
        content: dailyActivity.content,
        learningJourneyId: learningJourneyId,
        status: TaskStatusEnum.NOT_STARTED,
        day: day,

      })
    })

    return await this.taskRepository.createMany(tasks);
  }
}