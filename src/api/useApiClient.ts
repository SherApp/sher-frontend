import ApiClient from './apiClient';
import axios from 'axios';
import config, { routes } from '../utils/config';
import { refreshTokenInterceptor } from '@sherapp/sher-shared';
import { useRouter } from 'next/router';

export const useApiClient = (anonymous = false) => {
  const router = useRouter();

  const axiosInstance = axios.create({
    baseURL: config.api.baseUrl,
    withCredentials: true
  });

  const apiClient = new ApiClient(axiosInstance);

  if (!anonymous) {
    const handleAuthRequired = () => {
      router.replace(routes.auth('signIn', router.pathname));
    };

    axiosInstance.interceptors.response.use(
      (r) => r,
      refreshTokenInterceptor(
        axiosInstance,
        handleAuthRequired,
        () => apiClient.refreshToken(),
        config.api.endpoints.token.root
      )
    );
  }

  return apiClient;
};
