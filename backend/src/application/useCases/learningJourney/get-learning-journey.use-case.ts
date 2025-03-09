// src/application/usecases/learning-journey/get-learning-journey-by-id.usecase.ts
import { ILearningJourneysRepository } from "../../../domain/repository/learning-journey-repository.interface";
import { LearningJourneyEntity } from "../../../domain/entities/learning-journey.entity";
import { GetLearningJourneyByIdInputDto } from "../../schemas/group-by-learning-journey-by-id-input";

export class GroupBySettingLearningJourneyByIdUseCase {
  constructor(
    private readonly learningJourneysRepository: ILearningJourneysRepository,
  ) {}

  public async execute(
    input: GetLearningJourneyByIdInputDto,
  ): Promise<LearningJourneyEntity[] | []> {
    const { id } = input;

    const learningJourney =
      await this.learningJourneysRepository.findBySettingsId(id);

    if (!learningJourney) {
      throw new Error("Learning Journey não encontrado");
    }

    return learningJourney;
  }
}
