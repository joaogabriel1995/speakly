import { CreateLearningSettingsUseCase } from "../../application/useCases/learningSettings/create-learning-settings.use-case";
import { ProcessPlanMessagesUseCase } from "../../application/useCases/messaging/processing-plan-study.use-case";
import { ProcessTranscriptionMessagesUseCase } from "../../application/useCases/messaging/processing-transcription.use-case";
import { CreateManyLearningJourney } from "../../application/useCases/plan-study/create-learning-journey.use-case";
import prisma from "../prisma/client";
import { LearningJourneyRepoPrisma } from "../repository/learning-journey.prisma";
import { LearningSettingsRepoPrisma } from "../repository/learning-settings.prisma";
import { configService } from "../services/config.service";
import { RabbitMQBrokerAdvanced } from "./rabbitmq-broker";
import { WebSocketBroker } from "./web-socket-server";

export async function startConsumer(): Promise<void> {
  try {
    // Inicializa configurações
    const config = configService.getInstance().getConfig();

    // Inicializa dependências
    const messageBroker = RabbitMQBrokerAdvanced.getInstance(config.RABBIT_URI)

    const wsBroker = WebSocketBroker.getInstance('localhost', 8091);
    wsBroker.init()
    // Inicializa o consumer
    const processTranscriptUseCase = new ProcessTranscriptionMessagesUseCase(messageBroker, wsBroker);
    await processTranscriptUseCase.execute('transcription-queue');

    const learningJourneyRepoPrisma = new LearningJourneyRepoPrisma(prisma)
    const createManyLearningJourney = new CreateManyLearningJourney(learningJourneyRepoPrisma)


    const learningSettingsRepository = new LearningSettingsRepoPrisma(prisma)
    const createLearningSettingsUseCase = new CreateLearningSettingsUseCase(learningSettingsRepository)
    const studyUseCase = new ProcessPlanMessagesUseCase(messageBroker, wsBroker, createManyLearningJourney, createLearningSettingsUseCase);
    await studyUseCase.execute('agent-plan-study-response');
  } catch (error) {
    console.error("Error RabbitMQConsumer")
  }

}
