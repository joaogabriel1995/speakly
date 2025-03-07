import { LearningSettingsEntity } from "../entities/LearningSettings";

export interface ILearningSettingsRepository {
  create(learningSettings: LearningSettingsEntity): Promise<LearningSettingsEntity>;
}
