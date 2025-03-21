import { Prisma, PrismaClient } from "@prisma/client";
import { SkillEnum, TaskEntity, TaskStatusEnum } from "../../domain/entities/task.entity";
import { ITaskRepository } from "../../domain/repository/task-repository.interface";


export class TaskRepoPrisma implements ITaskRepository {
  constructor(private prisma: PrismaClient) { }

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
        // content: String(value.getContent()),
        day: value.getDay(),
      };
      return data;
    });
    const tasksPrisma = await this.prisma.task.createManyAndReturn({ data });
    return tasksPrisma.map((value) => new TaskEntity({
      day: value.day,
      duration: value.duration,
      learningJourneyId: value.learningJourneyId,
      repetitions: value.repetitions,
      resource: value.resource,
      skill: value.skill as unknown as SkillEnum,
      status: value.status as unknown as TaskStatusEnum,
      task: value.task,
    }, value.id));

  }
  async findManyByJourney(journeyId: string): Promise<TaskEntity[]> {
    const tasks = await this.prisma.task.findMany({
      where: {
        learningJourney: { id: { equals: journeyId } }
      }
    })
    return tasks.map((value) => new TaskEntity({
      day: value.day,
      duration: value.duration,
      learningJourneyId: value.learningJourneyId,
      repetitions: value.repetitions,
      resource: value.resource,
      skill: value.skill as unknown as SkillEnum,
      status: value.status as unknown as TaskStatusEnum,
      task: value.task,
    }, value.id));
  }

}