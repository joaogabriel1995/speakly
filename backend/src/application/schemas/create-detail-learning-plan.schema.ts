import {  z } from "zod";

export const CreateDetailedLearningPlanInput = z.object({
  objective: z.string(),
  activities: z.string(),
  theory: z.string(),
  settingId: z.string(),
  learningDetailId: z.string()
})


export type CreateDetailedLearningPlanInputDto = z.infer<typeof CreateDetailedLearningPlanInput>