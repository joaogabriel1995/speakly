import { z } from "zod";

export const mediaMessageResponseSchema = z.object({
  mediaType: z.string(),
  fileName: z.string(),
  size: z.object({ fileLength: z.string() }),
  mimetype: z.string(),
  base64: z.string(),
});

export type MediaMessageResponseDTO = z.infer<
  typeof mediaMessageResponseSchema
>;
