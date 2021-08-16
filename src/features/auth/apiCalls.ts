import axios from 'axios';
import config from '../../utils/config';
import apiClient from '../../api/apiClient';
import { RegistrationSettings, User } from '@sherapp/sher-shared/auth';

interface SignInRequest {
  emailAddress: string;
  password: string;
}

interface SignUpRequest extends SignInRequest {
  userId: string;
  invitationCode?: string;
}

const anonymousClient = axios.create({ baseURL: config.api.baseUrl });

export const signIn = (request: SignInRequest) => {
  return anonymousClient.post(config.api.endpoints.token.new, request);
};

export const refreshToken = () => {
  return apiClient.post(config.api.endpoints.token.root, {});
};

export const signOut = () => {
  return anonymousClient.delete(config.api.endpoints.token.root);
};

export const signUp = (request: SignUpRequest) => {
  return anonymousClient.post(config.api.endpoints.user, request);
};

export const getUser = async (): Promise<User> => {
  const response = await apiClient.get(config.api.endpoints.user);
  return response?.data ?? null;
};

export const getRegistrationSettings = async (): Promise<RegistrationSettings> => {
  const { data } = await apiClient.get(
    config.api.endpoints.platform.registrationSettings
  );
  return data;
};
