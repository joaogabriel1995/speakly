// server/index.ts
import express from "express";
import { configService } from "../services/config.service"; // Ajuste o caminho
import { router } from "./routes/router";
import cors from "cors";
import { WebSocketBroker } from "../messaging/web-socket-server";

const app = express();

app.use(express.json());

export async function startServer(): Promise<void> {
  try {
    const config = configService.getInstance().getConfig();

    const port = config.SERVER_PORT;

    app.use(
      cors({
        origin: "*", // Defina um domínio específico se necessário
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      }),
    );
    app.use(router);

    app.listen(port, () => {
      console.log(`Server rodando na porta ${port}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
}
