// src/services/transcriptionService.ts
import { api } from './api';

export interface PlanStudyResponse {
  text: string;
}

export const planStudyService = {
  plan: async (
    level: string,
    duration: string,
    days_week: string,
    hour_day: string,
    ): Promise<PlanStudyResponse> => {
    const response = await api.post('/study', {
      level,
      duration,
      days_week,
      hour_day,
    });
    return response.data;
  },
};
