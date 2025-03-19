import { LearningJourneyEntity } from "../../../domain/entities/learning-journey.entity";
import { LearningSettingsEntity } from "../../../domain/entities/learning-settings.entity";
import { ILearningSettingsRepository } from "../../../domain/repository/learning-settings-repository.interface";
import { LearningSettingsInputDto } from "../../schemas/learning-settings-input.schema";

export class CreateLearningSettingsUseCase {
  constructor(
    private learningSettingsRepository: ILearningSettingsRepository,
  ) {}

  async execute(
    input: LearningSettingsInputDto,
  ): Promise<LearningSettingsEntity> {
    const learningSettings = new LearningSettingsEntity(input);
    return await this.learningSettingsRepository.create(learningSettings);
  }
}
