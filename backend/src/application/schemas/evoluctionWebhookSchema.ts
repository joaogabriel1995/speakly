import { z } from "zod";
import { EvolutionWebhookBodyDTO } from "../dto/evolutionWebhookDTO";

// Schema para DeviceListMetadata
const deviceListMetadataSchema = z.object({
    senderKeyHash: z.string(),
    senderTimestamp: z.string(),
    senderAccountType: z.string(),
    receiverAccountType: z.string(),
    recipientKeyHash: z.string(),
    recipientTimestamp: z.string(),
});

// Schema para MessageContextInfo
const messageContextInfoSchema = z.object({
    deviceListMetadata: deviceListMetadataSchema,
    deviceListMetadataVersion: z.number(),
    messageSecret: z.string(),
});

// Schema para Message
const messageSchema = z.object({
    conversation: z.string(),
    messageContextInfo: messageContextInfoSchema,
});

// Schema para Key
const keySchema = z.object({
    remoteJid: z.string(),
    fromMe: z.boolean(),
    id: z.string(),
});

// Schema para WebhookData
const webhookDataSchema = z.object({
    key: keySchema,
    pushName: z.string(),
    status: z.string(),
    message: messageSchema,
    messageType: z.string(),
    messageTimestamp: z.number(),
    instanceId: z.string(),
    source: z.string(),
})

// Schema principal para EvolutionWebhookBodyDTO
export const webhookBodySchema = z.object({
    event: z.string(),
    instance: z.string(),
    data: webhookDataSchema,
    destination: z.string(),
    date_time: z.string().datetime(), // Validação estrita de ISO 8601
    sender: z.string(),
    server_url: z.string(),
    apikey: z.string(),
});

// Tipo inferido para garantir compatibilidade (opcional)
export type WebhookBodySchemaType = z.infer<typeof webhookBodySchema>;
