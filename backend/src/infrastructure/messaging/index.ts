import { CreateLearningSettingsUseCase } from "../../application/useCases/learning-settings/create-learning-settings.use-case";
import { ProcessPlanMessagesUseCase } from "../../application/useCases/messaging/processing-plan-study.use-case";
import { ProcessTranscriptionMessagesUseCase } from "../../application/useCases/messaging/processing-transcription.use-case";
import { CreateManyLearningJourney } from "../../application/useCases/learning-journey/create-learning-journey.use-case";
import prisma from "../prisma/client";
import { LearningJourneyRepoPrisma } from "../repository/learning-journey.prisma";
import { LearningSettingsRepoPrisma } from "../repository/learning-settings.prisma";
import { configService } from "../services/config.service";
import { RabbitMQBrokerAdvanced } from "./rabbitmq-broker";
import { WebSocketBroker } from "./web-socket-server";
import { ProcessDetailLearningMessagesUseCase } from "../../application/useCases/messaging/processing-detail-learning.use-case";
import { TaskRepoPrisma } from "../repository/task.prisma";
import { CreateManyTaskUseCase } from "../../application/useCases/task/create-many-task.use-case";
import { CreateListeningLeasonUseCase } from "../../application/useCases/listening-leason/create-listening-leason.use-case";
import { ListeningLeasonRepoPrisma } from "../repository/listening-leason.prisma";

export async function startConsumer(): Promise<void> {
  try {
    // Inicializa configurações
    const config = configService.getInstance().getConfig();

    // Inicializa dependências
    const messageBroker = RabbitMQBrokerAdvanced.getInstance(config.RABBIT_URI);

    const wsBroker = WebSocketBroker.getInstance("localhost", 8091);
    wsBroker.init();
    // Inicializa o consumer
    const processTranscriptUseCase = new ProcessTranscriptionMessagesUseCase(
      messageBroker,
      wsBroker,
    );
    await processTranscriptUseCase.execute("transcription-queue");

    const learningJourneyRepoPrisma = new LearningJourneyRepoPrisma(prisma);
    const createManyLearningJourney = new CreateManyLearningJourney(
      learningJourneyRepoPrisma,
    );

    const learningSettingsRepository = new LearningSettingsRepoPrisma(prisma);
    const createLearningSettingsUseCase = new CreateLearningSettingsUseCase(
      learningSettingsRepository,
    );
    const learningJourney = new ProcessPlanMessagesUseCase(
      messageBroker,
      wsBroker,
      createManyLearningJourney,
      createLearningSettingsUseCase,
    );


    const taskRepo = new TaskRepoPrisma(prisma)
    const createManyTaskUseCase = new CreateManyTaskUseCase(taskRepo)
    const listeningLeasonRepo = new ListeningLeasonRepoPrisma(prisma)
    const createListeningLeasonUseCase = new CreateListeningLeasonUseCase(listeningLeasonRepo)
    const processDetailLearningMessagesUseCase = new ProcessDetailLearningMessagesUseCase(messageBroker, wsBroker, createManyTaskUseCase, createListeningLeasonUseCase);




    await learningJourney.execute("learning_plan_response");
    await processDetailLearningMessagesUseCase.execute("weekly_detail_plan");

  } catch (error) {
    console.error("Error RabbitMQConsumer");
  }
}
