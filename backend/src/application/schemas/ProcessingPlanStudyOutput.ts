import { z } from 'zod';
import { LearningSettingsInputSchema } from './LearningSettingsInputSchema';

// Schema de exemplo para mensagens da fila (pode ser movido para fora ou parametrizado)

// Definindo o schema para uma única entrada do plano
const PlanEntrySchema = z.object({
  objective: z.string(),
  activity: z.string(),
  week: z.number().int(),
  month: z.number().int(),
  theory: z.string(),

});

// Definindo o schema para o plano completo
export const PlanStudyOutputSchema = z.object({
  plan: z.array(PlanEntrySchema),
  userId: z.string(),
  settings: LearningSettingsInputSchema
});

// Inferindo o tipo TypeScript a partir do schema
export type PlanStudyDto = z.infer<typeof PlanStudyOutputSchema>;
export type PlanEntryDto = z.infer<typeof PlanStudyOutputSchema>;
