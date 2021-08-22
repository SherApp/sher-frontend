import { useEffect, useState } from 'react';
import apiClient from '../../../api/apiClient';
import { refreshTokenInterceptor } from '@sherapp/sher-shared';
import config, { routes } from '../../../utils/config';
import { refreshToken } from '../apiCalls';
import { useRouter } from 'next/router';

const RefreshTokenInterceptorProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const [interceptorIn, setInterceptorIn] = useState(false);

  useEffect(() => {
    const handleAuthRequired = () => {
      router.replace(routes.auth('signIn', router.pathname));
    };

    const interceptorId = apiClient.interceptors.response.use(
      (r) => r,
      refreshTokenInterceptor(
        apiClient,
        handleAuthRequired,
        refreshToken,
        config.api.endpoints.token.root
      )
    );

    setInterceptorIn(true);

    return () => apiClient.interceptors.response.eject(interceptorId);
  }, [router]);

  if (!interceptorIn) return null;

  return <>{children}</>;
};

export default RefreshTokenInterceptorProvider;
