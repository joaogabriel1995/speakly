// src/services/transcriptionService.ts
import { api } from './api';

export interface PlanStudyResponse {
  text: string;
}

export const planStudyService = {
  plan: async (
    level: string,
    duration: number,
    daysWeek: number,
    hourDay: number,
  ): Promise<PlanStudyResponse> => {
    const response = await api.post('/study', {
      level,
      duration,
      daysWeek,
      hourDay,
    });
    return response.data;
  },
};
