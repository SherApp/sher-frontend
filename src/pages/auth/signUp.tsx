import AuthPageLayout from '../../features/auth/AuthPageLayout';
import AuthPageHeading from '../../features/auth/AuthPageHeading';
import SignUpForm from '../../features/auth/SignUpForm';

const SignUp = () => {
  return (
    <AuthPageLayout>
      <AuthPageHeading>Sign up</AuthPageHeading>
      <SignUpForm />
    </AuthPageLayout>
  );
};

export default SignUp;
