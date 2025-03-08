import { LearningJourneyEntity } from "../entities/learning-journey.entity";

export interface ILearningJourneysRepository {
  create(learningJourney: LearningJourneyEntity): Promise<void>;
  createMany(learningJourney: LearningJourneyEntity[]): Promise<void>;
}
