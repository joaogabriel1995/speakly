import { Router } from "express"
import { WhatsAppAdapter } from "../adapters/EvolutionAppAdapter"
import { EvolutionController } from "../../application/controllers/EvolutionController"
import { AppConversationOrchestratorUseCase } from "../../application/useCases/chat/AppConversationOrchestratorUseCase"
import { EvolutionMediaMessageService } from "../services/EvolutionMediaMessageService"
import { HandleVoiceInputUseCase } from "../../application/useCases/voice/HandleVoiceInputUseCase"
import { HandleChatInputUseCase } from "../../application/useCases/chat/HandleChatInputUseCase"
import { TranscriberController } from "../../application/controllers/TranscriberController"
import { TranscriberUseCase } from "../../application/useCases/transcriber/TranscriberUseCase"
import { TranscriptionRepoPrisma } from "../repository/transcriberPrisma"
import { PrismaClient } from "@prisma/client"
import { RabbitMQBrokerAdvanced } from "../messaging/RabbitMQBroker"

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


export { router }
