import { z } from "zod";
import { SkillEnum } from "../../domain/entities/task.entity";

const ListeningToolOutputActivitySchema = z.object({
  content: z.string(),
  transcription: z.string(), // Ajustado de number para string, pois seu JSON contém texto
  url: z.string(),
});
const DailyActivitySchema = z.object({
  task: z.string(),
  resource: z.string(),
  skill: z.nativeEnum(SkillEnum),
  duration: z.number().min(1),
  repetitions: z.number().min(1),
  content: z.union([ListeningToolOutputActivitySchema, z.null()]), // Ajuste conforme o schema de content
});

// Schema para um plano diário
const DailyPlanWithContentSchema = z.object({
  day: z.number().min(1),
  activities: z.array(DailyActivitySchema),
  total_duration: z.number().min(1),
});

// Schema para o plano semanal completo
const WeeklyStudyPlanDetailWithContentSchema = z.object({
  weekly_plan: z.array(DailyPlanWithContentSchema),
  user_id: z.string(),
  learning_journey_id: z.string(),
});

const DailyActivityWithContentSchema = DailyActivitySchema.extend({

  day: z.number().min(1, "O dia da semana deve ser pelo menos 1."),
  activities: z.array(DailyActivitySchema).min(1, "Deve haver pelo menos uma atividade."),
  total_duration: z.number().min(1, "A duração total deve ser pelo menos 1 minuto."),
});





// Tipos gerados a partir dos schemas
export type DailyActivity = z.infer<typeof DailyActivitySchema>;
export type DailyActivityWithContent = z.infer<typeof DailyActivityWithContentSchema>;
export type DailyPlanWithContent = z.infer<typeof DailyPlanWithContentSchema>;
export type WeeklyStudyPlanDetailWithContent = z.infer<typeof WeeklyStudyPlanDetailWithContentSchema>;

export {
  ListeningToolOutputActivitySchema,
  DailyActivitySchema,
  DailyActivityWithContentSchema,
  DailyPlanWithContentSchema,
  WeeklyStudyPlanDetailWithContentSchema
};
