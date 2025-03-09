// src/application/schemas/get-learning-journey-by-id-input.schema.ts
import { z } from "zod";

export const GetLearningJourneyByIdInput = z.object({
  id: z.string().uuid("ID inválido. Deve ser um UUID válido."),
});

// A DTO que será utilizada pelo UseCase
export type GetLearningJourneyByIdInputDto = z.infer<typeof GetLearningJourneyByIdInput>;
