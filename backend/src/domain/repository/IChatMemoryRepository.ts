import { Message } from "../entities/Message";

export interface IChatRepository {
    saveMessage(message: Message): Promise<void>;
    getChatHistory(chatId: string, limit?: number): Promise<Message[]>;
    clearChatHistory(chatId: string): Promise<void>;
}
