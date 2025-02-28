// src/services/transcriptionService.ts
import { api } from './api';

export interface TranscriptionResponse {
  text: string;
  // outros campos que sua API possa retornar
}

export const transcriptionService = {
  transcribeAudio: async (audioUrl: string): Promise<TranscriptionResponse> => {
    const response = await api.post('/transcription', { url: audioUrl });
    return response.data;
  },
};
