import { z } from "zod";

export const LearningSettingsInputSchema = z.object({
  level: z.string(),
  duration: z.number(),
  daysWeek: z.number(),
  hourDay: z.number(),
  userId: z.string(),
});

export type LearningSettingsInputDto = z.infer<
  typeof LearningSettingsInputSchema
>;
