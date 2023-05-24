import { tokenKey } from '../config';

export function getToken() {
  return localStorage.getItem(tokenKey);
}

export function setToken(token: string) {
  localStorage.setItem(tokenKey, token);
}

export function removeToken() {
  localStorage.removeItem(tokenKey);
}
