import axios from 'axios';
import config from '../../utils/config';
import apiClient from '../../api/apiClient';

interface SignInRequest {
  emailAddress: string;
  password: string;
}

export const signIn = (request: SignInRequest) => {
  return axios.post(`${config.api.endpoints.signIn}`, request);
};

export const signOut = () => {
  return axios.delete(`${config.api.endpoints.refreshToken}`);
};

export const getUser = () => {
  return apiClient.get(`${config.api.endpoints.user}`);
};
