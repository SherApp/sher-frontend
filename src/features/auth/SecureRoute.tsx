import { Route, RouteProps } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser } from './apiCalls';

const SecureRoute = (props: RouteProps) => {
  useEffect(() => {
    // If a user isn't logged in, this will fail and cause a redirect to login page
    getUser();
  }, []);

  return <Route {...props} />;
};

export default SecureRoute;
