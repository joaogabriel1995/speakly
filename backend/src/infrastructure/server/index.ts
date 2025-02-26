// server/index.ts
import express from 'express';
import { configService } from '../services/configService'; // Ajuste o caminho
import { router } from './Router';

const app = express();

app.use(express.json());

export async function startServer(): Promise<void> {
  try {
    // Carrega e valida as configurações no início
    const config = configService.getInstance().getConfig();
    console.log('Configurações carregadas com sucesso:', config);

    const port = config.SERVER_PORT;

    app.use(router);

    app.listen(port, () => {
      console.log(`Server rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}
