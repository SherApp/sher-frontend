import { useEffect, useState } from 'react';
import { refreshTokenInterceptor } from '@sherapp/sher-shared';
import config, { routes } from '../../../utils/config';
import csrAxiosInstance from '../../../api/csrAxiosInstance';
import { useRouter } from 'next/router';
import { useApiClient } from '../../../api/useApiClient';

const RefreshTokenInterceptorProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const [interceptorIn, setInterceptorIn] = useState(false);

  const apiClient = useApiClient();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleAuthRequired = () => {
      router.replace(routes.auth('signIn', router.pathname));
    };

    const interceptorId = csrAxiosInstance.interceptors.response.use(
      (r) => r,
      refreshTokenInterceptor(
        csrAxiosInstance,
        handleAuthRequired,
        apiClient.refreshToken,
        config.api.endpoints.token.root
      )
    );

    setInterceptorIn(true);

    return () => csrAxiosInstance.interceptors.response.eject(interceptorId);
  }, [router]);

  if (!interceptorIn) return null;

  return <>{children}</>;
};

export default RefreshTokenInterceptorProvider;
