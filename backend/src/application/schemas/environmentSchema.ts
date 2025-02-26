import { z } from 'zod'




export const DatabaseSchema = z.object({
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number().default(5432),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),

});



export const RabbitSchema = z.object({
  RABBIT_HOST: z.string(),
  RABBIT_PORT: z.coerce.number().default(5672),
  RABBIT_USER: z.string(),
  RABBIT_PASSWORD: z.string(),
});

export type RabbitConfig = z.infer<typeof RabbitSchema>;


export const EnvironmentSchema = z.object({
    SERVER_PORT: z.coerce.number().default(3000),
    RABBIT_HOST: RabbitSchema.shape.RABBIT_HOST,
    RABBIT_PORT: RabbitSchema.shape.RABBIT_PORT,
    RABBIT_USER: RabbitSchema.shape.RABBIT_USER,
    RABBIT_PASSWORD: RabbitSchema.shape.RABBIT_PASSWORD

  })

export type EnvironmentConfig = z.infer<typeof EnvironmentSchema>
