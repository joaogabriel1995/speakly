import { LearningJourneyEntity } from "../entities/LearningJourney";


export interface ILearningJourneysRepository {
  create(learningJourney: LearningJourneyEntity): Promise<void>;
  createMany(learningJourney: LearningJourneyEntity[]): Promise<void>;
}
