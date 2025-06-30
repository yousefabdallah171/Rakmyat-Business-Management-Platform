import api from '@/lib/api';

export const getProjectBoard = async (projectId: number) => {
  const { data } = await api.get(`/projects/${projectId}/board`);
  return data;
};

export const updateTaskStatus = async (taskId: number, status: string) => {
  const { data } = await api.put(`/tasks/${taskId}/status`, { status });
  return data;
}; 