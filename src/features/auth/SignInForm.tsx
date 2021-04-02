import TextInput from '../../components/TextInput';
import InputAdornment from '../../components/InputAdornment';
import userIcon from '../../img/user.svg';
import passwordIcon from '../../img/password.svg';
import Button from '../../components/Button';
import { useState } from 'react';
import EllipsisLoading from '../../components/EllipsisLoading';
import { signIn } from './apiCalls';
import { useHistory } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';

interface Props {
  returnPath: string;
}

interface Values {
  emailAddress: string;
  password: string;
}

const SignInForm = ({ returnPath }: Props) => {
  const history = useHistory();

  const [signingIn, setSigningIn] = useState(false);

  const handleSubmit = async ({ emailAddress, password }: Values) => {
    setSigningIn(true);

    await signIn({ emailAddress, password });

    history.push(returnPath);
  };

  if (signingIn) {
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
          <Button type="submit">Sign in</Button>
          <Button variant="secondary">Sign up</Button>
        </div>
      </Form>
    </Formik>
  );
};

export default SignInForm;
