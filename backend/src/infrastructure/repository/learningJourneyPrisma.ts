import { Prisma, PrismaClient } from "@prisma/client"
import { LearningJourneyEntity } from "../../domain/entities/LearningJourney"
import { ILearningJourneysRepository } from "../../domain/repository/ILearningJourneyRepository";

export class LearningJourneyRepoPrisma implements ILearningJourneysRepository {
  constructor(private prisma: PrismaClient) { }
  async create(learningSetting: LearningJourneyEntity): Promise<void> {
    const data: Prisma.LearningJourneyCreateInput = {
      activity: learningSetting.getActivity(),
      month: learningSetting.getMonth(),
      objective: learningSetting.getObjective(),
      theory: learningSetting.getTheory(),
      week: learningSetting.getWeek(),
      id: learningSetting.getId(),
      user: {connect: {id: learningSetting.getUserId()}},
      learningSettings: {connect: {id: learningSetting.getLearningJourneyId()}}

    };
    await this.prisma.learningJourney.create({ data });
  }
  async createMany(learningJourney: LearningJourneyEntity[]): Promise<void> {
    const data = learningJourney.map(((value) => {
      const data: Prisma.LearningJourneyCreateManyInput = {
        activity: value.getActivity(),
        month: value.getMonth(),
        objective: value.getObjective(),
        theory: value.getTheory(),
        week: value.getWeek(),
        id: value.getId(),
        userId: value.getUserId(),
        LearningSettingsId: value.getLearningJourneyId()
      };
      return data
    }))
    await this.prisma.learningJourney.createMany({ data });

  }

}
