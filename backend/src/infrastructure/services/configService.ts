import { EnvironmentConfig, EnvironmentSchema } from "../../application/schemas/EnvironmentSchema";
import { EnvLoader, IEnvLoader } from "../config/EnvLoader";


export class ConfigService {
  private config: EnvironmentConfig | null = null;

  constructor(private envLoader: IEnvLoader<EnvironmentConfig>) { }

  getConfig(): EnvironmentConfig {
    if (!this.config) {
      this.config = this.envLoader.load();
    }
    return this.config;
  }
}

export const configService = (() => {
  let instance: ConfigService | null = null;

  const createInstance = () => {
    const envLoader = new EnvLoader(EnvironmentSchema);
    return new ConfigService(envLoader);
  };


  return {
    getInstance: (): ConfigService => {
      if (!instance) {
        instance = createInstance();
        if (instance !== null) {
          instance.getConfig()
        }

      }
      return instance;
    },
  };
})();
