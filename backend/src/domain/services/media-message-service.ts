import { MediaMessageResponseDTO } from "../../application/schemas/media-message.schema";

export interface IMediaMessageService {
  getBase64FromMediaMessage(
    instance: string,
    messageID: string,
    apikey: string,
  ): Promise<MediaMessageResponseDTO>;
}
