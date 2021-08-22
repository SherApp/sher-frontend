import Button from '../../components/Button';
import EllipsisLoading from '../../components/EllipsisLoading';
import { signIn } from './apiCalls';
import { Field, Form, Formik } from 'formik';
import { routes } from '../../utils/config';
import { useMutation } from 'react-query';
import { handleError } from '../../utils/handleError';
import { useRouter } from 'next/router';
import ContainedTextInput from '../../components/TextInput/ContainedTextInput';
import Link from 'next/link';

interface Values {
  emailAddress: string;
  password: string;
}

interface QueryParams {
  returnUrl?: string;
}

const SignInForm = () => {
  const { query, ...router } = useRouter();
  const { returnUrl } = query as QueryParams;

  const { isLoading, ...signInMutation } = useMutation(
    (values: Values) => signIn(values),
    {
      onSuccess: () => {
        router.replace(returnUrl ?? '/');
      },
      onError: handleError
    }
  );

  const handleSubmit = async (values: Values) => {
    await signInMutation.mutateAsync(values);
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
        <div className="space-y-2 mb-12">
          <Field
            as={ContainedTextInput}
            name="emailAddress"
            label="Email"
            type="email"
          />
          <Field
            as={ContainedTextInput}
            name="password"
            label="Password"
            type="password"
          />
        </div>
        <div className="flex flex-row justify-between items-center">
          <Link href={routes.auth('signUp')} passHref>
            <a className="text-pink uppercase">Sign up</a>
          </Link>
          <Button variant="gradient" type="submit">
            Sign in
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default SignInForm;
