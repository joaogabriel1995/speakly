import { z } from "zod";

export const ListLearningSettingsInputSchema = z.object({
  userId: z.string(),
});

export type ListLearningSettingsInputDto = z.infer<
  typeof ListLearningSettingsInputSchema
>;
