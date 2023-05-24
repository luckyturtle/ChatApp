import React, { createContext, useState } from 'react';
import { User } from '../types';

const INITIAL_STATE : {
  users: User[];
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  removeUser: (user: User) => void;
} = {
  users: [],
  setUsers: () => {},
  addUser: () => {},
  removeUser: () => {},
};

export const UserContext = createContext(INITIAL_STATE);

interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (user: User) => {
    setUsers(users => [...users, user]);
  };

  const removeUser = (user: User) => {
    setUsers(users => users.filter(member => member.username !== user.username));
  };

  return (
    <UserContext.Provider value={{ users, setUsers, addUser, removeUser }}>{children}</UserContext.Provider>
  );
}
