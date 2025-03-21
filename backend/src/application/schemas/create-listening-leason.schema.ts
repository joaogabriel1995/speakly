import { z } from "zod";

export const CreateListeningLeasonInputSchema = z.object({
  content: z.string(),
  transcription: z.string(),
  url: z.string(),
  taskId: z.string()
});

export type CreateListeningLeasonInputDto = z.infer<typeof CreateListeningLeasonInputSchema>;