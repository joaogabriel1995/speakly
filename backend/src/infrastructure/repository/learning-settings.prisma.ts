import { Prisma, PrismaClient } from "@prisma/client"
import { LearningSettingsEntity } from "../../domain/entities/learning-settings.entity"
import { ILearningSettingsRepository } from "../../domain/repository/learning-settings-repository.interface";

export class LearningSettingsRepoPrisma implements ILearningSettingsRepository {
  constructor(private prisma: PrismaClient) { }
  async create(learningSetting: LearningSettingsEntity): Promise<LearningSettingsEntity> {
    const data: Prisma.LearningSettingsCreateInput = {
      daysWeek: learningSetting.getDaysWeek(),
      duration: learningSetting.getDuration(),
      hourDay: learningSetting.getHourDay(),
      level: learningSetting.getLevel(),
      user: { connect: { id: learningSetting.getUserId() } }
    };
    const learningSettinsPrisma = await this.prisma.learningSettings.create({ data });

    return new LearningSettingsEntity({
      daysWeek: learningSetting.getDaysWeek(),
      duration: learningSetting.getDuration(),
      hourDay: learningSetting.getHourDay(),
      level: learningSetting.getLevel(),
      userId: learningSetting.getUserId()
    },
      learningSettinsPrisma.id
    )
  }
  async findManyByUserId(userId: string): Promise<LearningSettingsEntity[]> {
    const settingsFromDb = await this.prisma.learningSettings.findMany({
      where: {
        userId: { equals: userId },
      },
      select: {
        id: true,
        level: true,
        duration: true,
        daysWeek: true,
        hourDay: true,
        userId: true,
      },
    });

    const settingsEntities = settingsFromDb.map(
      (setting) => new LearningSettingsEntity(setting)
    );

    return settingsEntities;
  }

}
