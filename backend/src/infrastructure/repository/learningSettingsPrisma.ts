import { Prisma, PrismaClient } from "@prisma/client"
import { LearningSettingsEntity } from "../../domain/entities/LearningSettings"
import { ILearningSettingsRepository } from "../../domain/repository/ILearningSettingsRepository";

export class LearningSettingsRepoPrisma implements ILearningSettingsRepository {
  constructor(private prisma: PrismaClient) { }
  async create(learningSetting: LearningSettingsEntity):Promise<LearningSettingsEntity> {
    const data: Prisma.LearningSettingsCreateInput = {
      daysWeek: learningSetting.getDaysWeek(),
      duration: learningSetting.getDuration(),
      hourDay: learningSetting.getHourDay(),
      level: learningSetting.getLevel(),
    };
    const learningSettinsPrisma = await this.prisma.learningSettings.create({ data });

    return new LearningSettingsEntity({
      daysWeek: learningSetting.getDaysWeek(),
      duration: learningSetting.getDuration(),
      hourDay: learningSetting.getHourDay(),
      level: learningSetting.getLevel(),
    },
      learningSettinsPrisma.id
    )
  }

}
