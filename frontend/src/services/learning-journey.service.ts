// src/services/transcriptionService.ts
import { api } from './api';

export interface ListFromSettingsResponse {
  id: string;
  objective: string;
  activity: string;
  week: number;
  month: number;
  theory: string;
  userId: string;
  learningSettingsId: string;
}

export const learningJourneyServices = {
  listFromSettingId: async (
    learningSettingId: string
  ): Promise<ListFromSettingsResponse[]> => {
    const response = await api.get(`/learning-journey/${learningSettingId}`)
    return response.data;
  },
};
