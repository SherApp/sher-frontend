import config from '../../../utils/config';
import { refreshToken } from '../apiCalls';

type AuthRequiredCallback = () => void;

export const refreshTokenInterceptor = (
  onAuthRequired: AuthRequiredCallback
) => async (error: any) => {
  if (error.response.status !== 401) {
    return;
  }

  const isRefreshTokenRequest = error.config.url.endsWith(
    config.api.endpoints.token.root
  );

  if (isRefreshTokenRequest) {
    onAuthRequired();
    return;
  }

  await refreshToken();
};
