import { Message } from "../../../domain/entities/message.entity";

export class HandleChatInputUseCase {
  // constructor(private readonly repository: MessageRepository) { }

  async execute(message: Message): Promise<void> {
    if (!message.getText || !message.getSender) {
      throw new Error("Mensagem inválida");
    }
    // await this.repository.save(message);/
  }
}
