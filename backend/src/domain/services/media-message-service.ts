import { MediaMessageResponseDTO } from "../../application/schemas/media-message.schemas";

export interface IMediaMessageService {
  getBase64FromMediaMessage(instance: string, messageID: string, apikey: string): Promise<MediaMessageResponseDTO>;
}
