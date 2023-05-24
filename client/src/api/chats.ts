import axios from './axios';
import { Chat } from '../types';

export function getChats() {
  return axios.get<Chat[]>('/chats')
    .then(({ data: chats }) => chats.map(
      chat => ({
        ...chat,
        date: new Date(chat.date)
      })
    ));
}
