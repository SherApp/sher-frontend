import TextInput from '../../components/TextInput';
import InputAdornment from '../../components/InputAdornment';
import userIcon from '../../img/user.svg';
import passwordIcon from '../../img/password.svg';
import Button from '../../components/Button';
import EllipsisLoading from '../../components/EllipsisLoading';
import { signIn } from './apiCalls';
import { useHistory, useLocation } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { routes } from '../../utils/config';
import { useMutation } from 'react-query';
import { handleError } from '../../utils/handleError';

interface Values {
  emailAddress: string;
  password: string;
}

const SignInForm = () => {
  const { search } = useLocation();
  const history = useHistory();

  const { isLoading, ...signInMutation } = useMutation(
    (values: Values) => signIn(values),
    {
      onSuccess: () => {
        const searchParams = new URLSearchParams(search);
        const returnUrl = searchParams.get('returnUrl');
        history.push(returnUrl ?? '/');
      },
      onError: handleError
    }
  );

  const handleSubmit = async (values: Values) => {
    await signInMutation.mutateAsync(values);
  };

  const handleSignUpClick = () => {
    history.push(routes.auth('signUp'));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <EllipsisLoading />
      </div>
    );
  }

  return (
    <Formik
      initialValues={{ emailAddress: '', password: '' }}
      onSubmit={handleSubmit}
      className="flex px-3 space-y-12 flex-col"
    >
      <Form className="px-3">
        <div className="space-y-12 mb-12">
          <Field
            as={TextInput}
            name="emailAddress"
            label="Email"
            type="email"
            placeholder="example@example.com"
            endAdornment={
              <InputAdornment>
                <img src={userIcon} alt="" />
              </InputAdornment>
            }
          />
          <Field
            as={TextInput}
            name="password"
            label="Password"
            type="password"
            endAdornment={
              <InputAdornment>
                <img src={passwordIcon} alt="" />
              </InputAdornment>
            }
          />
        </div>
        <div className="flex flex-col space-y-4">
          <Button variant="gradient" type="submit">
            Sign in
          </Button>
          <Button onClick={handleSignUpClick} variant="secondary">
            Sign up
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default SignInForm;
