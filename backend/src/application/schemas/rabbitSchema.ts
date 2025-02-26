import { z } from 'zod';

export const rabbitSchema = z.object({
  RABBIT_HOST: z.string(),
  RABBIT_PORT: z.coerce.number().default(5432),
  RABBIT_USER: z.string(),
  RABBIT_PASSWORD: z.string(),
});

export type RabbitConfig = z.infer<typeof rabbitSchema>;