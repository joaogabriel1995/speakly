// Tipos auxiliares para estruturas aninhadas
interface DeviceListMetadata {
    senderKeyHash: string;
    senderTimestamp: string;
    senderAccountType: 'E2EE' | string; // Pode haver outros valores
    receiverAccountType: 'E2EE' | string;
    recipientKeyHash: string;
    recipientTimestamp: string;
}

interface MessageContextInfo {
    deviceListMetadata: DeviceListMetadata;
    deviceListMetadataVersion: number;
    messageSecret: string;
}

interface Message {
    conversation: string;
    messageContextInfo: MessageContextInfo;
}

interface Key {
    remoteJid: string;
    fromMe: boolean;
    id: string;
}

interface WebhookData {
    key: Key;
    pushName: string;
    status: 'DELIVERY_ACK' | string; // Pode haver outros valores
    message: Message;
    messageType: 'conversation' | string; // Pode haver outros tipos
    messageTimestamp: number;
    instanceId: string;
    source: 'web' | string; // Pode haver outros valores
}

// DTO principal para o body do Webhook
export interface EvolutionWebhookBodyDTO {
    event: 'messages.upsert' | string; // Outros eventos possíveis
    instance: string;
    data: WebhookData;
    destination: string;
    date_time: string; // ISO 8601 format
    sender: string;
    server_url: string;
    apikey: string;
}

// DTO completo para a requisição do Webhook
export interface EvolutionWebhookDTO {
    headers: {
        'content-type': string;
        'user-agent': string;
        'content-length': string;
        'accept-encoding': string;
        host: string;
        connection: 'keep-alive' | string;
    };
    params: Record<string, unknown>;
    query: Record<string, unknown>;
    body: EvolutionWebhookBodyDTO;
    webhookUrl: string;
    executionMode: 'production' | 'development' | string;
}
