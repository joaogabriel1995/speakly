import { MediaMessageResponseDTO } from "../../application/schemas/MediaMessageSchemas";

export interface IMediaMessageService {
  getBase64FromMediaMessage(instance: string, messageID: string, apikey: string): Promise<MediaMessageResponseDTO>;
}
