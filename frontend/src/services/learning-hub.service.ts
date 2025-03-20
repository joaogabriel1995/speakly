// src/services/transcriptionService.ts
import { api } from './api';

export interface createLearningDetailInput {
  objective: string;
  activities: string;
  settingId: string;
  theory: string;
  learningDetailId: string;
}

export const learningHubServices = {
  create: async (input: createLearningDetailInput): Promise<string> => {
    const response = await api.post(`/learning-detail`, input)
    return response.data;
  },
};
