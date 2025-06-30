import api from '@/lib/api';

export const getEmployees = async () => {
  const { data } = await api.get('/employees');
  return data;
};

export const createEmployee = async (employee: {
  name: string;
  email: string;
  position: string;
  department_id?: number;
  joined_at?: string;
}) => {
  const { data } = await api.post('/employees', employee);
  return data;
}; 