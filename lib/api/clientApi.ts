import { noteInstance } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';

export interface RegisterRequest {
  email: string;
  password?: string;
}

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface FetchNotesParams {
  tag?: string;
  search?: string;
  page?: number;
  perPage?: number;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  tag: string;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const register = async (userData: RegisterRequest): Promise<User> => {
  const { data } = await noteInstance.post<User>('/auth/register', userData);
  return data;
};

export const login = async (credentials: LoginRequest): Promise<User> => {
  const { data } = await noteInstance.post<User>('/auth/login', credentials);
  return data;
};

export const logout = async (): Promise<void> => {
  await noteInstance.post('/auth/logout');
};

export const checkSession = async (): Promise<User | null> => {
  const { data } = await noteInstance.get<User | null>('/auth/session');
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await noteInstance.get<User>('/users/me');
  return data;
};

export const updateMe = async (userData: Partial<User>): Promise<User> => {
  const { data } = await noteInstance.patch<User>('/users/me', userData);
  return data;
};

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<NotesResponse> => {
  const { data } = await noteInstance.get<NotesResponse>('/notes', { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await noteInstance.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (
  noteData: CreateNoteRequest
): Promise<Note> => {
  const { data } = await noteInstance.post<Note>('/notes', noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await noteInstance.delete<Note>(`/notes/${id}`);
  return data;
};
