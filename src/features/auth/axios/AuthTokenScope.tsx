import { useEffect, useState } from 'react';
import apiClient from '../../../api/apiClient';
import { refreshTokenInterceptor } from './refreshTokenInterceptor';
import { useHistory } from 'react-router-dom';

const AuthTokenScope = ({ children }: React.PropsWithChildren<{}>) => {
  const history = useHistory();
  const [interceptorIn, setInterceptorIn] = useState(false);

  useEffect(() => {
    const handleAuthRequired = () => {
      history.push('/signIn');
    };

    const interceptorId = apiClient.interceptors.response.use(
      (r) => r,
      refreshTokenInterceptor(handleAuthRequired)
    );

    setInterceptorIn(true);

    return () => apiClient.interceptors.response.eject(interceptorId);
  }, [history]);

  if (!interceptorIn) return null;

  return <>{children}</>;
};

export default AuthTokenScope;
