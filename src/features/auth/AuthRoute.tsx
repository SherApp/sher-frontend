import Handwriting from '../../components/Handwriting';
import SignInForm from './SignInForm';
import { Route, Switch, useLocation } from 'react-router-dom';
import { routes } from '../../utils/config';
import SignUpForm from './SignUpForm';

const AuthRoute = () => {
  const { pathname } = useLocation();
  const isSignIn = pathname === routes.auth('signIn');
  return (
    <div className="w-full justify-center items-center flex flex-col flex-grow my-10">
      <Handwriting variant="h2" component="h1" className="py-4 mb-6">
        sher.lol
      </Handwriting>
      <div className="md:w-1/2 2xl:w-1/4 relative">
        <div className="w-full h-full bg-gradient-r-purple-pink absolute transform rotate-6 rounded-xl top-0 left-0 -z-10" />
        <div className="px-8 py-10 shadow-xl bg-white dark:bg-gray-800 rounded-xl">
          <Handwriting variant="h3" component="h2" className="py-4 mb-6">
            {isSignIn ? 'Sign in' : 'Sign up'}
          </Handwriting>
          <Switch>
            <Route path={routes.auth('signIn')} component={SignInForm} />
            <Route path={routes.auth('signUp')} component={SignUpForm} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default AuthRoute;
