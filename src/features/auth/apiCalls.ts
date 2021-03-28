import axios from 'axios';
import config from '../../utils/config';
import apiClient from '../../api/apiClient';
import { User } from './types';

interface SignInRequest {
  emailAddress: string;
  password: string;
}

export const signIn = (request: SignInRequest) => {
  return axios.post(`${config.api.endpoints.token.new}`, request);
};

export const refreshToken = () => {
  return apiClient.post(config.api.endpoints.token.root);
};

export const signOut = () => {
  return axios.delete(`${config.api.endpoints.token.root}`);
};

export const getUser = (): Promise<User> => {
  return apiClient.get(`${config.api.endpoints.user}`);
};
