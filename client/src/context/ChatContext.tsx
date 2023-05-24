import React, { createContext, useState } from 'react';
import { Chat } from '../types';

const INITIAL_STATE : {
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
  addChat: (chat: Chat) => void;
} = {
  chats: [],
  setChats: () => {},
  addChat: () => {},
};

export const ChatContext = createContext(INITIAL_STATE);

interface ChatProviderProps {
  children: React.ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [chats, setChats] = useState<Chat[]>([]);

  const addChat = (chat: Chat) => {
    setChats(chats => [...chats, chat]);
  };

  return (
    <ChatContext.Provider value={{ chats, setChats, addChat }}>{children}</ChatContext.Provider>
  );
}
