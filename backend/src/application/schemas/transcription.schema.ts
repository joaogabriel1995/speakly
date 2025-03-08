import { optional, z } from "zod";

// Schema principal para EvolutionWebhookBodyDTO
export const TransctiptionSchema = z.object({
  url: z.string(),
});

export type TransctiptionUseCaseDto = z.infer<typeof TransctiptionSchema>;
