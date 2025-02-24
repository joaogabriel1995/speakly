import { z } from "zod";

// Schema para DeviceListMetadata
const deviceListMetadataSchema = z.object({
    senderKeyHash: z.string(),
    senderTimestamp: z.string(),
    senderAccountType: z.string(),
    receiverAccountType: z.string(),
    recipientKeyHash: z.string(),
    recipientTimestamp: z.string(),
});
export type WebhookdeviceListMetadataSchemaType = z.infer<typeof deviceListMetadataSchema>;

// Schema para MessageContextInfo
const messageContextInfoSchema = z.object({
    deviceListMetadata: deviceListMetadataSchema,
    deviceListMetadataVersion: z.number(),
    messageSecret: z.string(),
});
export type WebhookMessageContextInfoSchemaType = z.infer<typeof messageContextInfoSchema>;

// Schema para Message
const messageSchema = z.object({
    conversation: z.string().optional(),
    base64: z.string().optional(),

    messageContextInfo: messageContextInfoSchema,
});
export type WebhookMessageSchemaType = z.infer<typeof messageSchema>;

// Schema para Key
const keySchema = z.object({
    remoteJid: z.string(),
    fromMe: z.boolean(),
    id: z.string(),
});
export type WebhookKeySchemaType = z.infer<typeof keySchema>;

export const messageTypeEnum =  z.enum(['conversation', 'audioMessage'])
// Schema para WebhookData
const webhookDataSchema = z.object({
    key: keySchema,
    pushName: z.string(),
    status: z.string(),
    message: messageSchema,
    messageType: messageTypeEnum,
    messageTimestamp: z.number(),
    instanceId: z.string(),
    source: z.string(),
})
export type WebhookDataSchemaType = z.infer<typeof webhookDataSchema>;

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

// export enum  MessageTypes {
//     conversation =  "conversation",
//     audioMessage = "audioMessage"
// }
