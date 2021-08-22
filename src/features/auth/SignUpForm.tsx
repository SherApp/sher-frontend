import Button from '../../components/Button';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { getRegistrationSettings, signUp } from './apiCalls';
import { v4 as uuidv4 } from 'uuid';
import EllipsisLoading from '../../components/EllipsisLoading';
import { useMutation, useQuery } from 'react-query';
import { handleError } from '../../utils/handleError';
import { toast } from 'react-toastify';
import { routes } from '../../utils/config';
import ContainedTextInput from '../../components/TextInput/ContainedTextInput';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SignUpSchema = Yup.object({
  emailAddress: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must have at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
  invitationCode: Yup.string().required('Invitation code is required')
});

interface Values {
  emailAddress: string;
  password: string;
  invitationCode: string;
}

const SignUpForm = () => {
  const router = useRouter();
  const { data } = useQuery('registrationSettings', getRegistrationSettings);

  const { isLoading, ...signInMutation } = useMutation(
    (values: Values) => signUp({ userId: uuidv4(), ...values }),
    {
      onSuccess: () => {
        toast.success('Registered successfully!');
        router.replace(routes.auth('signIn'));
      },
      onError: handleError
    }
  );

  const handleSubmit = async ({
    emailAddress,
    invitationCode,
    password
  }: Values) => {
    await signInMutation.mutateAsync({
      emailAddress,
      invitationCode,
      password
    });
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
      initialValues={{
        emailAddress: '',
        password: '',
        confirmPassword: '',
        invitationCode: ''
      }}
      onSubmit={handleSubmit}
      validationSchema={SignUpSchema}
      className="flex px-3 space-y-12 flex-col"
    >
      {({ errors, touched }) => (
        <Form className="px-3">
          <div className="space-y-2 mb-12">
            <Field
              as={ContainedTextInput}
              error={touched.emailAddress ? errors.emailAddress : null}
              name="emailAddress"
              label="Email"
              type="email"
              placeholder="example@example.com"
            />
            <Field
              as={ContainedTextInput}
              error={touched.password ? errors.password : null}
              name="password"
              label="Password"
              type="password"
            />
            <Field
              as={ContainedTextInput}
              error={touched.confirmPassword ? errors.confirmPassword : null}
              name="confirmPassword"
              label="Confirm password"
              type="password"
            />
            {data?.requiresInvitationCode && (
              <Field
                as={ContainedTextInput}
                error={touched.invitationCode ? errors.invitationCode : null}
                name="invitationCode"
                label="Invitation code"
              />
            )}
          </div>
          <div className="flex flex-row justify-between items-center">
            <Link href={routes.auth('signIn')} passHref>
              <a className="text-pink uppercase">Sign in</a>
            </Link>
            <Button variant="gradient" type="submit">
              Sign up
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
