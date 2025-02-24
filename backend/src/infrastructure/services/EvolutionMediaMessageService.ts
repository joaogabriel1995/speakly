import axios, { AxiosInstance } from "axios";
import { IMediaMessageService } from "../../domain/services/MediaMessageService";

export class EvolutionMediaMessageService implements IMediaMessageService {
    private readonly client: AxiosInstance;
    private readonly baseUrl: string;

    constructor(baseUrl = "http://localhost:8080") {
        this.baseUrl = baseUrl;
        this.client = axios.create({
            baseURL: this.baseUrl,
            timeout: 5000, // Timeout de 5 segundos para evitar travamentos
        });
    }

    async getBase64FromMediaMessage(instance: string, messageID: string, apikey: string): Promise<{base64: string}> {
        if (!instance?.trim()) {
            throw new Error("Instance ID cannot be empty");
        }
        console.log(`instance: ${instance}`);
        console.log(`messageID: ${messageID}`);
        console.log(`apikey: ${apikey}`);
        try {
            const response = await this.client.post<string>(
                `/chat/getBase64FromMediaMessage/${instance}`,
                {
                    "message": {
                        "key": {
                            "id": messageID
                        }
                    },
                    "convertToMp4": true
                },
                { headers: { "apikey": apikey, "Content-Type": "application/json" } }

            );
            const base64Data = response.data as unknown as {base64: string};
            // console.log(JSON.parse(base64Data))
            return base64Data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Failed to fetch media message: ${error.response?.status} - ${error.message}`);
            }
            throw new Error(`Unexpected error fetching media message: ${error}}`);
        }
    }
}
