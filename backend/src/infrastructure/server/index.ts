// server/index.ts
import express from 'express';
import { configService } from '../services/configService'; // Ajuste o caminho
import { router } from './Router';
import cors from "cors";

const app = express();

app.use(express.json());

export async function startServer(): Promise<void> {
  try {
    const config = configService.getInstance().getConfig();
    console.log('Configurações carregadas com sucesso:', config);

    const port = config.SERVER_PORT;

    app.use(cors({
      origin: '*', // Defina um domínio específico se necessário
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    app.use(router);


    app.listen(port, () => {
      console.log(`Server rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}
