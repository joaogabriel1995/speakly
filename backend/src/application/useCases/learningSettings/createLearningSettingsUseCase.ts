import { LearningJourneyEntity } from "../../../domain/entities/LearningJourney";
import { LearningSettingsEntity } from "../../../domain/entities/LearningSettings";
import { ILearningSettingsRepository } from "../../../domain/repository/ILearningSettingsRepository";
import { LearningSettingsInputDto } from "../../schemas/LearningSettingsInputSchema";

export class CreateLearningSettingsUseCase {
  constructor(private learningSettingsRepository: ILearningSettingsRepository){ }

  async execute(input: LearningSettingsInputDto) :Promise<LearningSettingsEntity>{
    const learningSettings = new LearningSettingsEntity(input)
    return await this.learningSettingsRepository.create(learningSettings)
  }
}
