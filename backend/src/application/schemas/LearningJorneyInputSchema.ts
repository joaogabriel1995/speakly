import { z } from "zod";

export const LearningJourneyInput = z.array(z.object({
  objective: z.string(),
  activity: z.string(),
  week: z.number().int(),
  month: z.number().int(),
  theory: z.string(),
}))

export type LearningJourneyInputDto = z.infer<typeof LearningJourneyInput>
