// index.ts (raiz)

import { startConsumer } from "./infrastructure/messaging";
import { startServer } from "./infrastructure/server";

// Ponto de entrada da aplicação
(async () => {
  try {
    await startServer();
    await startConsumer()
    console.log('Aplicação inicializada com sucesso');
  } catch (error) {
    console.error('Erro ao inicializar a aplicação:', error);
    process.exit(1);
  }
})();
