import { useEffect, useState } from 'react';
import apiClient from '../../../api/apiClient';
import { refreshTokenInterceptor } from '@sherapp/sher-shared/auth';
import { useHistory, useLocation } from 'react-router-dom';
import config, { routes } from '../../../utils/config';
import { refreshToken } from '../apiCalls';

const RefreshTokenInterceptorProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [interceptorIn, setInterceptorIn] = useState(false);

  useEffect(() => {
    const handleAuthRequired = () => {
      history.push(routes.auth('signIn', pathname));
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
  }, [history, pathname]);

  if (!interceptorIn) return null;

  return <>{children}</>;
};

export default RefreshTokenInterceptorProvider;
