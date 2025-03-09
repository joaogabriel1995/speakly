// src/services/transcriptionService.ts
import { api } from './api';

export interface LearningSettingsResponse {
  id: string
  level: string
  duration: number
  daysWeek: number
  hourDay: number
}

export const learningSettingsServices = {
  listFromUserId: async (
    userId: string
  ): Promise<LearningSettingsResponse[]> => {
    const response = await api.post('/learning-settings', {
      userId
    });
    return response.data;
  },
};
