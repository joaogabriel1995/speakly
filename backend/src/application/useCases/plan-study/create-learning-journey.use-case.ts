import { LearningJourneyEntity } from "../../../domain/entities/learning-journey.entity";
import { ILearningJourneysRepository } from "../../../domain/repository/learning-journey-repository.interface";
import { LearningJourneyInputDto } from "../../schemas/learning-jorney-input.schema";

export class CreateManyLearningJourney {
  constructor(private repository: ILearningJourneysRepository) {}

  async execute(
    input: LearningJourneyInputDto,
  ): Promise<LearningJourneyEntity[]> {
    const { plan, userId, learningSettingsId } = input;
    const learningData = plan.map((data) => {
      return new LearningJourneyEntity({
        objective: data.objective,
        activity: data.activity,
        week: data.week,
        month: data.month,
        theory: data.theory,
        userId: userId,
        learningJourneyId: learningSettingsId,
      });
    });

    await this.repository.createMany(learningData);
    return learningData;
  }
}
