import axios from './axios';
import { User } from '../types';

export function getUsers() {
  return axios.get<User[]>('/users');
}
