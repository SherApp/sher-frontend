import AuthPageLayout from '../../features/auth/AuthPageLayout';
import AuthPageHeading from '../../features/auth/AuthPageHeading';
import SignInForm from '../../features/auth/SignInForm';

const SignIn = () => {
  return (
    <AuthPageLayout>
      <AuthPageHeading>Sign in</AuthPageHeading>
      <SignInForm />
    </AuthPageLayout>
  );
};

export default SignIn;
