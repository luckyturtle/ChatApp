import { removeToken, setToken } from '../utils/storage';
import axios from './axios';

export interface LoginData {
  username: string;
  name: string;
}

export interface LoginResponse {
  token: string;
}

export interface WhoamiResponse {
  user: {
    id: string;
    username: string;
    name: string;
  },
  token: string
}

export function login(data: LoginData) {
  return axios.post<LoginResponse>('/login', data)
    .then(({ data }) => setToken(data.token))
    .catch(err => Promise.reject(err));
}

export function whoami() {
  return axios.get<WhoamiResponse>('/whoami');
}

export function logout() {
  removeToken();
}
