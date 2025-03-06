import { ProcessPlanMessagesUseCase } from "../../application/useCases/messaging/ProcessingPlanStudyUseCase";
import { ProcessQueueMessagesUseCase } from "../../application/useCases/messaging/ProcessingTranscriptionUseCase";
import { CreateManyLearningJourney } from "../../application/useCases/plan-study/CreateLearningJourney";
import prisma from "../prisma/client";
import { LearningJourneyRepoPrisma } from "../repository/learningJourneyPrisma";
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
    const learningJourneyRepoPrisma = new LearningJourneyRepoPrisma(prisma)
    const createManyLearningJourney = new CreateManyLearningJourney(learningJourneyRepoPrisma)
    const studyUseCase = new ProcessPlanMessagesUseCase(messageBroker, wsBroker, createManyLearningJourney);
    await studyUseCase.execute('agent-plan-study-response');
  } catch (error) {
    console.error("Error RabbitMQConsumer")
  }

}
