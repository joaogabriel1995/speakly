import { z } from "zod";

export interface IEnvLoader<T> {
  load(): T;
}

export class EnvLoader<T extends z.ZodObject<any>>
  implements IEnvLoader<z.infer<T>>
{
  constructor(private schema: T) {}
  load(): z.infer<T> {
    try {
      return this.schema.parse(process.env);
    } catch (error) {
      throw new Error(
        `Erro ao validar configuração: ${(error as Error).message}`,
      );
    }
  }
}
