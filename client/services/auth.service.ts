import api from '@/lib/api';

export const login = async (email: string, password: string) => {
  const { data } = await api.post('/login', { email, password });
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', data.token);
  }
  return data.user;
};

export const register = async (name: string, email: string, password: string) => {
  const { data } = await api.post('/register', { name, email, password });
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', data.token);
  }
  return data.user;
};

export const logout = async () => {
  await api.post('/logout');
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
}; 