import axios from 'axios';
import config from '../../utils/config';
import apiClient from '../../api/apiClient';
import { RegistrationSettings, User } from './types';

interface SignInRequest {
  emailAddress: string;
  password: string;
}

interface SignUpRequest extends SignInRequest {
  userId: string;
  invitationCode?: string;
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

export const signUp = (request: SignUpRequest) => {
  return axios.post(config.api.endpoints.user, request);
};

export const getUser = async (): Promise<User> => {
  const { data } = await apiClient.get(`${config.api.endpoints.user}`);
  return data;
};

export const getRegistrationSettings = async (): Promise<RegistrationSettings> => {
  const { data } = await apiClient.get(
    config.api.endpoints.platform.registrationSettings
  );
  return data;
};
