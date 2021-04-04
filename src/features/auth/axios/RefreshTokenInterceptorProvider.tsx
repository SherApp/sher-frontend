import { useEffect, useState } from 'react';
import apiClient from '../../../api/apiClient';
import { refreshTokenInterceptor } from './refreshTokenInterceptor';
import { useHistory, useLocation } from 'react-router-dom';
import { routes } from '../../../utils/config';

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
      refreshTokenInterceptor(handleAuthRequired)
    );

    setInterceptorIn(true);

    return () => apiClient.interceptors.response.eject(interceptorId);
  }, [history, pathname]);

  if (!interceptorIn) return null;

  return <>{children}</>;
};

export default RefreshTokenInterceptorProvider;
