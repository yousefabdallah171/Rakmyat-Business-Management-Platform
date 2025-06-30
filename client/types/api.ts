export interface User {
  id: number;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'employee' | 'client';
}

export interface Employee {
  id: number;
  user_id: number;
  position: string;
  department_id?: number;
  joined_at?: string;
  user: User;
}

export interface Department {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  title: string;
  status: string;
  deadline?: string;
  budget?: number;
}

export interface Task {
  id: number;
  project_id: number;
  assignee_id?: number;
  title: string;
  status: string;
  time_spent: number;
}

export interface Invoice {
  id: number;
  client_id: number;
  amount: number;
  status: string;
  due_date: string;
}

export interface Message {
  id: number;
  sender_id: number;
  receiver_id?: number;
  content: string;
  attachment?: string;
  created_at: string;
} 