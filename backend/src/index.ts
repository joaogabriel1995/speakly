// index.ts (raiz)

import { startServer } from "./infrastructure/server";

// Ponto de entrada da aplicação
(async () => {
  try {
    await startServer();
    console.log('Aplicação inicializada com sucesso');
  } catch (error) {
    console.error('Erro ao inicializar a aplicação:', error);
    process.exit(1);
  }
})();
