import { Message } from "../entities/message";

export interface ChatMemoryRepository {
    saveMessage(message: Message): Promise<void>;
    getChatHistory(chatId: string, limit?: number): Promise<Message[]>;
    clearChatHistory(chatId: string): Promise<void>;
  }
