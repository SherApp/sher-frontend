import { AxiosRequestConfig } from 'axios';

export const axiosAuthInterceptor = (accessToken: string) => {
  return (value: AxiosRequestConfig) => {
    value.headers['Authorization'] = `Bearer ${accessToken}`;
    return value;
  };
};
