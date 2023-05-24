import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { apiUrl } from '../config';
import { getToken } from '../utils/storage';

export interface ErrorResponse {
  message?: string;
}

const instance = axios.create({
  baseURL: apiUrl
});

instance.interceptors.request.use(function (request) {
  const token = getToken();
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

instance.interceptors.response.use(function (response) {
  return response;
}, function (error: AxiosError<ErrorResponse>) {
  if (error.status === 401) {
    
    localStorage.removeItem('chat-token');
  }

  if (error?.response?.data?.message) {
    toast.error(error?.response?.data?.message);
  } else {
    toast.error(String(error));
  }

  return Promise.reject(error);
});

export default instance;
