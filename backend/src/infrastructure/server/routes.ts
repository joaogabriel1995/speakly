import { Router } from "express"
import { HandleChatInputUseCase } from "../../application/useCases/handleChatInputUseCase"
import { WhatsAppAdapter } from "../adapters/evolutionAppAdapter"
import { EvolutionController } from "../../application/controllers/evolutionController"

const router = Router()

router.post('/', async (request, response) => {
    const handleChatInputUseCase = new HandleChatInputUseCase()
    const whatsAppAdapter = new WhatsAppAdapter()
    const evolutionController = new EvolutionController(handleChatInputUseCase, whatsAppAdapter)
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
