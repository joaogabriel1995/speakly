import { z } from "zod";

export const LearningPlanInput = z.array(
  z.object({
    objective: z.string(),
    activity: z.string(),
    week: z.number().int(),
    month: z.number().int(),
    theory: z.string(),
  }),
);

export const LearningJourneyInput = z.object({
  plan: LearningPlanInput,
  userId: z.string(),
  learningSettingsId: z.string(),
});

export type LearningPlanInputDto = z.infer<typeof LearningPlanInput>;

export type LearningJourneyInputDto = z.infer<typeof LearningJourneyInput>;
