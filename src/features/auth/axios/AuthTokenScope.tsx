import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState } from 'react';
import { axiosAuthInterceptor } from './axiosAuthInterceptor';
import apiClient from '../../../api/apiClient';

const AuthTokenScope = ({ children }: React.PropsWithChildren<{}>) => {
  const [interceptorIn, setInterceptorIn] = useState(false);
  const { authState } = useOktaAuth();

  useEffect(() => {
    if (!authState.accessToken?.accessToken) return;

    const interceptorId = apiClient.interceptors.request.use(
      axiosAuthInterceptor(authState.accessToken.accessToken)
    );

    setInterceptorIn(true);

    return () => apiClient.interceptors.request.eject(interceptorId);
  }, [authState.accessToken?.accessToken]);

  if (!interceptorIn && authState.isAuthenticated) return null;

  return <>{children}</>;
};

export default AuthTokenScope;
