/**
 * API endpoint functions.
 */
import { apiClient } from './client';
import { GenerationResult } from '../types';

export interface GenerateRequest {
  prompt: string;
}

/**
 * Generate a website using the AI agents.
 */
export const generateWebsite = async (
  prompt: string
): Promise<GenerationResult> => {
  return apiClient.post<GenerationResult>('/api/v1/ai/generate', { prompt });
};

/**
 * Health check endpoint.
 */
export const healthCheck = async (): Promise<{ status: string; service: string }> => {
  return apiClient.get<{ status: string; service: string }>('/api/v1/ai/health');
};
