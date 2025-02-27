import { ProcessQueueMessagesUseCase } from "../../application/useCases/messaging/ProcessingTranscriptionUseCase";
import { configService } from "../services/configService";
import { RabbitMQBrokerAdvanced } from "./RabbitMQBroker";

export async function startConsumer(): Promise<void> {
  try {
    // Inicializa configurações
    const config = configService.getInstance().getConfig();

    // Inicializa dependências
    const messageBroker = RabbitMQBrokerAdvanced.getInstance(config.RABBIT_URI)

    // Inicializa o consumer
    const queueUseCase = new ProcessQueueMessagesUseCase(messageBroker);
    await queueUseCase.execute('transcription-queue');
  } catch (error) {
    console.error("Error RabbitMQConsumer")
  }

}
