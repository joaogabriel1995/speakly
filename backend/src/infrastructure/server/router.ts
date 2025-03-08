import { Router } from "express"
import { WhatsAppAdapter } from "../adapters/evolution-app.adapter"
import { EvolutionController } from "../../application/controllers/evolution.controller"
import { AppConversationOrchestratorUseCase } from "../../application/useCases/chat/app-conversation-orchestrator.use-case"
import { EvolutionMediaMessageService } from "../services/evolution-media-message.service"
import { HandleVoiceInputUseCase } from "../../application/useCases/voice/handle-voice-input.use-case"
import { HandleChatInputUseCase } from "../../application/useCases/chat/handle-chat-input.use-case"
import { TranscriberController } from "../../application/controllers/transcriber.controller"
import { TranscriberUseCase } from "../../application/useCases/transcriber/transcriber.use-case"
import { TranscriptionRepoPrisma } from "../repository/transcriber.prisma"
import { PrismaClient } from "@prisma/client"
import { RabbitMQBrokerAdvanced } from "../messaging/rabbitmq-broker"
import { PlanStudyUseCase } from "../../application/useCases/plan-study/study-plan.use-case"
import { PlanStudyController } from "../../application/controllers/plan-study.controller"

const router = Router()

router.post('/', async (request, response) => {
    const handleChatInputUseCase = new HandleChatInputUseCase()
    const evolutionMediaMessageService = new EvolutionMediaMessageService()
    const rabbitMQBroker = RabbitMQBrokerAdvanced.getInstance("amqp://localhost:5672")
    await rabbitMQBroker.init()
    const handleVoiceInputUseCase = new HandleVoiceInputUseCase(evolutionMediaMessageService, rabbitMQBroker)
    const whatsAppAdapter = new WhatsAppAdapter()

    const appConversationOrchestratorUseCase = new AppConversationOrchestratorUseCase(
        handleChatInputUseCase,
        handleVoiceInputUseCase,
        whatsAppAdapter)

    const evolutionController = new EvolutionController(appConversationOrchestratorUseCase)
    await evolutionController.handle({
        body: request.body,
        method: request.method,
        headers: request.headers
    })
    response.status(200).json({
        message: "On"
    })

})


router.post('/transcription', async (request, response) => {
  console.log("ASDASDASDASDASD")
  const rabbitMQBroker = RabbitMQBrokerAdvanced.getInstance("amqp://localhost:5672")
  await rabbitMQBroker.init()
  const prisma = new PrismaClient()
  const transcriptionRepo= new TranscriptionRepoPrisma(prisma)
  const transcriber = new TranscriberUseCase(rabbitMQBroker, transcriptionRepo)
  const transcriberController = new TranscriberController(transcriber)
  transcriberController.handle({
    body: request.body,
    method: request.method,
    headers: request.headers
  })
  response.status(200).json({
      message: "On"
  })

})
router.post('/study', async (request, response) => {
  const rabbitMQBroker = RabbitMQBrokerAdvanced.getInstance("amqp://localhost:5672")
  await rabbitMQBroker.init()

  const plan = new PlanStudyUseCase(rabbitMQBroker)
  const transcriberController = new PlanStudyController(plan)
  transcriberController.handle({
    body: request.body,
    method: request.method,
    headers: request.headers
  })
  response.status(200).json({
      message: "On"
  })

})

export { router }
