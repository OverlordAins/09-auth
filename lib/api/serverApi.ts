import { cookies } from 'next/headers';
import { AxiosResponse, isAxiosError } from 'axios';
import { noteInstance } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';
import { FetchNotesParams } from './clientApi';

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  return {
    Cookie: allCookies,
  };
};

export const checkSession = async (): Promise<AxiosResponse> => {
  const headers = await getAuthHeaders();
  return await noteInstance.get('/auth/session', { headers });
};

export const getMeServer = async (): Promise<User | null> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await noteInstance.get<User>('/users/me', { headers });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status !== 401) {
      console.error('getMeServer Error:', error);
    }
    return null;
  }
};

export const fetchNotesServer = async (params: FetchNotesParams) => {
  try {
    const headers = await getAuthHeaders();
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== undefined)
    );
    const { data } = await noteInstance.get('/notes', {
      params: cleanParams,
      headers,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error('Server Fetch Notes Error Data:', error.response.data);
    }
    return null;
  }
};

export const fetchNoteByIdServer = async (id: string): Promise<Note | null> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await noteInstance.get<Note>(`/notes/${id}`, { headers });
    return data;
  } catch (error) {
    console.error('fetchNoteByIdServer Error:', error);
    return null;
  }
};
