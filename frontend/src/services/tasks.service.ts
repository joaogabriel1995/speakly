// src/services/transcriptionService.ts
import { api } from './api';

export interface TasksResponse {
  id: string,
  task: string,
  resource: string,
  skill: string,
  duration: number,
  repetitions: number,
  status: string,
  learningJourneyId: string,
  day: number
}

export const taskService = {
  getById: async (
    journeyId: string
  ): Promise<TasksResponse[]> => {
    const response = await api.get(`/tasks/${journeyId}`)
    return response.data;
  }
};
