import Handwriting from '../../components/Handwriting';
import SignInForm from './SignInForm';
import { useOktaAuth } from '@okta/okta-react';
import { Redirect } from 'react-router-dom';

const SignInRoute = () => {
  const { authState } = useOktaAuth();
  if (authState.isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="w-full justify-center items-center flex flex-col flex-grow">
      <Handwriting variant="h2" component="h1" className="py-4 mb-6">
        sher.lol
      </Handwriting>
      <div className="md:w-1/2 xl:w-1/4 relative">
        <div className="w-full h-full bg-gradient-r-purple-pink absolute transform rotate-6 rounded-xl top-0 left-0 -z-10" />
        <div className="px-8 py-10 shadow-xl bg-white dark:bg-gray-800 rounded-xl">
          <Handwriting variant="h3" component="h2" className="py-4 mb-6">
            Sign in
          </Handwriting>
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default SignInRoute;
