import config from '../../../utils/config';
import apiClient from '../../../api/apiClient';

type AuthRequiredCallback = () => void;

export const refreshTokenInterceptor = (
  onAuthRequired: AuthRequiredCallback
) => async (error: any) => {
  if (error.response.status !== 401) {
    return;
  }

  const isRefreshTokenRequest = error.config.url.endsWith(
    config.api.endpoints.refreshToken
  );

  if (isRefreshTokenRequest) {
    onAuthRequired();
    return;
  }

  await apiClient.post(config.api.endpoints.refreshToken);
};
