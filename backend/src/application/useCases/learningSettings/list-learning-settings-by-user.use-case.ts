import { ILearningSettingsRepository } from "../../../domain/repository/learning-settings-repository.interface";

// Erro customizado para falhas específicas do caso de uso
class ListLearningSettingsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ListLearningSettingsError";
  }
}

export class ListLearningSettingsByUser {
  constructor(
    private learningSettingsRepository: ILearningSettingsRepository,
  ) {}

  async execute(userId: string) {
    if (!userId || typeof userId !== "string" || userId.trim() === "") {
      throw new ListLearningSettingsError(
        "O userId deve ser uma string não vazia.",
      );
    }

    try {
      const learningSettings =
        await this.learningSettingsRepository.findManyByUserId(userId);

      return learningSettings;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao listar configurações de aprendizado";
      throw new ListLearningSettingsError(
        `Falha ao listar configurações de aprendizado: ${errorMessage}`,
      );
    }
  }
}
