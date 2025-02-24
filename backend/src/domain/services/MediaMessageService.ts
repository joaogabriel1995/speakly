export interface IMediaMessageService {
    getBase64FromMediaMessage(instance: string,messageID: string, apikey: string): Promise<{base64: string}>;
}
