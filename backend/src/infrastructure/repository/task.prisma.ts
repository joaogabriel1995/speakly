import { Prisma, PrismaClient } from "@prisma/client";
import { TaskEntity } from "../../domain/entities/task.entity";
import { ITaskRepository } from "../../domain/repository/task-repository.interface";
import { connect } from "http2";








export class TaskRepoPrisma implements ITaskRepository {
  constructor(private prisma: PrismaClient) {}

  async createMany(tasks: TaskEntity[]): Promise<TaskEntity[]> {
    const data = tasks.map((value) => {
      const data: Prisma.TaskCreateManyInput = {
        task: value.getTask(),
        resource: value.getResource(),
        skill: value.getSkill(),
        duration: value.getDuration(),
        repetitions: value.getRepetitions(),
        status: value.getStatus(),
        learningJourneyId: value.getLearningJourneyId(),
        content: String(value.getContent()),
        day: value.getDay(),
      };
      return data;
    });
    await this.prisma.task.createMany({ data });
    return tasks;
  }

}