import TextInput from '../../components/TextInput';
import InputAdornment from '../../components/InputAdornment';
import userIcon from '../../img/user.svg';
import passwordIcon from '../../img/password.svg';
import userAddIcon from '../../img/user_add.svg';
import Button from '../../components/Button';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { getRegistrationSettings } from './apiCalls';

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
}

const SignUpForm = () => {
  const [
    requiresInvitationCode,
    setRequiredInvitationCode
  ] = useState<boolean>();

  useEffect(() => {
    getRegistrationSettings().then((s) =>
      setRequiredInvitationCode(s.requiresInvitationCode)
    );
  }, []);

  const handleSubmit = (values: Values) => {
    console.log(values);
  };

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
          <div className="space-y-12 mb-12">
            <Field
              as={TextInput}
              error={touched.emailAddress ? errors.emailAddress : null}
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
              error={touched.password ? errors.password : null}
              name="password"
              label="Password"
              type="password"
              endAdornment={
                <InputAdornment>
                  <img src={passwordIcon} alt="" />
                </InputAdornment>
              }
            />
            <Field
              as={TextInput}
              error={touched.confirmPassword ? errors.confirmPassword : null}
              name="confirmPassword"
              label="Confirm password"
              type="password"
              endAdornment={
                <InputAdornment>
                  <img src={passwordIcon} alt="" />
                </InputAdornment>
              }
            />
            {requiresInvitationCode && (
              <Field
                as={TextInput}
                error={touched.invitationCode ? errors.invitationCode : null}
                name="invitationCode"
                label="Invitation code"
                endAdornment={
                  <InputAdornment>
                    <img src={userAddIcon} alt="" />
                  </InputAdornment>
                }
              />
            )}
          </div>
          <Button type="submit" fullWidth>
            Sign up
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
