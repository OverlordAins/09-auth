'use client';

import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { getMe } from '@/lib/api/clientApi';
import { isAxiosError } from 'axios';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await getMe();
        setUser(user);
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
          setUser(null);
        } else {
          console.error('Auth initialization error:', error);
          setUser(null);
        }
      }
    };

    initAuth();
  }, [setUser]);

  return <>{children}</>;
}
