import { z } from "zod";

export const ListLearningSettingsInputSchema = z.object({
  userId: z.string(),
})

export type ListLearningSettingsInputtDto = z.infer<typeof ListLearningSettingsInputSchema>
