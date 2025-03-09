import { Prisma, PrismaClient } from "@prisma/client";
import { LearningJourneyEntity } from "../../domain/entities/learning-journey.entity";
import { ILearningJourneysRepository } from "../../domain/repository/learning-journey-repository.interface";

export class LearningJourneyRepoPrisma implements ILearningJourneysRepository {
  constructor(private prisma: PrismaClient) { }
  async create(LearningJourney: LearningJourneyEntity): Promise<void> {
    const data: Prisma.LearningJourneyCreateInput = {
      activity: LearningJourney.getActivity(),
      month: LearningJourney.getMonth(),
      objective: LearningJourney.getObjective(),
      theory: LearningJourney.getTheory(),
      week: LearningJourney.getWeek(),
      id: LearningJourney.getId(),
      user: { connect: { id: LearningJourney.getUserId() } },
      learningSettings: {
        connect: { id: LearningJourney.getLearningJourneyId() },
      },
    };
    await this.prisma.learningJourney.create({ data });
  }
  async createMany(learningJourney: LearningJourneyEntity[]): Promise<void> {
    const data = learningJourney.map((value) => {
      const data: Prisma.LearningJourneyCreateManyInput = {
        activity: value.getActivity(),
        month: value.getMonth(),
        objective: value.getObjective(),
        theory: value.getTheory(),
        week: value.getWeek(),
        id: value.getId(),
        userId: value.getUserId(),
        learningSettingsId: value.getLearningJourneyId(),
      };
      return data;
    });
    await this.prisma.learningJourney.createMany({ data });
  }
  async findBySettingsId(learningSettingId: string): Promise<LearningJourneyEntity[] | []> {
    const learningJourney = await this.prisma.learningJourney.findMany({
      where: { learningSettings: { id: learningSettingId } }
    })

    const response = learningJourney.map((learning) => {

      const {
        updatedAt, createdAt, id, ...rest
      } = learning
      return new LearningJourneyEntity(
        rest, id
      )
    })
    return response
  }
}
