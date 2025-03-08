import { LearningSettingsEntity } from "../entities/learning-settings.entity";

export interface ILearningSettingsRepository {
  create(learningSettings: LearningSettingsEntity): Promise<LearningSettingsEntity>;
  findManyByUserId(userId: string): Promise<LearningSettingsEntity[]>;

}
