import { ProcessQueueMessagesUseCase } from "../../application/useCases/messaging/ProcessingTranscriptionUseCase";
import { configService } from "../services/configService";
import { RabbitMQBrokerAdvanced } from "./RabbitMQBroker";
import { WebSocketBroker } from "./WebSocketServer";

export async function startConsumer(): Promise<void> {
  try {
    // Inicializa configurações
    const config = configService.getInstance().getConfig();

    // Inicializa dependências
    const messageBroker = RabbitMQBrokerAdvanced.getInstance(config.RABBIT_URI)

    const wsBroker = WebSocketBroker.getInstance('localhost', 8091);
    wsBroker.init()
    // Inicializa o consumer
    const queueUseCase = new ProcessQueueMessagesUseCase(messageBroker, wsBroker);
    await queueUseCase.execute('transcription-queue');
  } catch (error) {
    console.error("Error RabbitMQConsumer")
  }

}
