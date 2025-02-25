import { optional, z } from "zod";

// Schema para DeviceListMetadata
const DeviceListMetadataSchema = z.object({
    senderKeyHash: z.string().optional(),
    senderTimestamp: z.string().optional(),
    senderAccountType: z.string().optional(),
    receiverAccountType: z.string().optional(),
    recipientKeyHash: z.string().optional(),
    recipientTimestamp: z.string().optional(),
});
export type WebhookdeviceListMetadataSchemaType = z.infer<typeof DeviceListMetadataSchema>;

// Schema para MessageContextInfo
const MessageContextInfoSchema = z.object({
    deviceListMetadata: DeviceListMetadataSchema,
    deviceListMetadataVersion: z.number(),
    messageSecret: z.string(),
});
export type WebhookMessageContextInfoSchemaType = z.infer<typeof MessageContextInfoSchema>;

// Schema para Message
const MessageSchema = z.object({
    conversation: z.string().optional(),
    base64: z.string().optional(),

    messageContextInfo: MessageContextInfoSchema.optional(),
});
export type WebhookMessageSchemaType = z.infer<typeof MessageSchema>;

// Schema para Key
const KeySchema = z.object({
    remoteJid: z.string(),
    fromMe: z.boolean(),
    id: z.string(),
});
export type WebhookKeySchemaType = z.infer<typeof KeySchema>;

export const MessageTypeEnum =  z.enum(['conversation', 'audioMessage'])
// Schema para WebhookData
const WebhookDataSchema = z.object({
    key: KeySchema,
    pushName: z.string(),
    status: z.string(),
    message: MessageSchema,
    messageType: MessageTypeEnum,
    messageTimestamp: z.number(),
    instanceId: z.string(),
    source: z.string(),
})
export type WebhookDataSchemaType = z.infer<typeof WebhookDataSchema>;

// Schema principal para EvolutionWebhookBodyDTO
export const WebhookBodySchema = z.object({
    event: z.string(),
    instance: z.string(),
    data: WebhookDataSchema,
    destination: z.string(),
    date_time: z.string().datetime(), // Validação estrita de ISO 8601
    sender: z.string(),
    server_url: z.string(),
    apikey: z.string(),
});

export type WebhookBodySchemaType = z.infer<typeof WebhookBodySchema>;

