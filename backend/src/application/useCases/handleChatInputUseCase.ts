import { Message } from "../../domain/entities/message";
import { MessageRepository } from "../../domain/repository/messageRepository";
export class HandleChatInputUseCase {
    // constructor(private readonly repository: MessageRepository) { }

    async execute(message: Message): Promise<void> {
        if (!message.getText || !message.getSender) {
            throw new Error('Mensagem inválida');
        }
        console.log(`Processando mensagem: ${message.getText}`);
        // await this.repository.save(message);
    }
}


