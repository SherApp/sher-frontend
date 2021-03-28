import { Route, RouteProps } from 'react-router-dom';
import { useUser } from './useUser';

const SecureRoute = (props: RouteProps) => {
  // If a user isn't logged in, this will fail and cause a redirect to login page
  useUser();

  return <Route {...props} />;
};

export default SecureRoute;
