import express from 'express'
import { EvolutionController } from '../../application/controllers/evolutionController'
import { HandleChatInputUseCase } from '../../application/useCases/handleChatInputUseCase'
import { WhatsAppAdapter } from '../adapters/evolutionAppAdapter'
import { router } from './routes'


const app = express()

app.use(express.json())

app.use(router)
app.listen(3000, () => {
    console.log('Server')
})
