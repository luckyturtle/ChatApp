import React, { createContext, useState } from 'react';
import { User } from '../types';

const INITIAL_STATE : {
  profile: User | null;
  setProfile: (profile: User | null) => void;
} = {
  profile: null,
  setProfile: () => {},
};

export const AuthContext = createContext(INITIAL_STATE);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [profile, setProfile] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ profile, setProfile }}>{children}</AuthContext.Provider>
  );
}
