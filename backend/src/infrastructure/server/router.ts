import { Router } from "express"
import { HandleChatInputUseCase } from "../../application/useCases/handleChatInputUseCase"
import { WhatsAppAdapter } from "../adapters/evolutionAppAdapter"
import { EvolutionController } from "../../application/controllers/evolutionController"
import { AppConversationOrchestratorUseCase } from "../../application/useCases/chat/appConversationOrchestratorUseCase"
import { HandleVoiceInputUseCase } from "../../application/useCases/handleVoiceInputUseCase"
import { EvolutionMediaMessageService } from "../services/EvolutionMediaMessageService"
import { RabbitMQBrokerAdvanced } from "../messaging/RabbitMQBroker"

const router = Router()

router.post('/', async (request, response) => {
    const handleChatInputUseCase = new HandleChatInputUseCase()
    const evolutionMediaMessageService = new EvolutionMediaMessageService()
    const rabbitMQBrokerAdvanced = new RabbitMQBrokerAdvanced("amqp://localhost:5672")
    await rabbitMQBrokerAdvanced.init()
    const handleVoiceInputUseCase = new HandleVoiceInputUseCase(evolutionMediaMessageService, rabbitMQBrokerAdvanced)
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




export { router }
