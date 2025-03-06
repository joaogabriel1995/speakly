import { optional, z } from "zod";

// Schema principal para EvolutionWebhookBodyDTO
export const PlanStudySchema = z.object({
  level: z.string(),
  duration: z.string(),
  days_week: z.string(),
  hour_day: z.string(),
});


export type PlanStudyUseCaseDto = z.infer<typeof PlanStudySchema>;

