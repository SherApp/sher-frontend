import TextInput from '../../components/TextInput';
import InputAdornment from '../../components/InputAdornment';
import userIcon from '../../img/user.svg';
import passwordIcon from '../../img/password.svg';
import Button from '../../components/Button';
import { Form, Formik, Field } from 'formik';

interface Values {
  emailAddress: string;
  password: string;
}

const SignUpForm = () => {
  const handleSubmit = (values: Values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{ emailAddress: '', password: '', invitationCode: null }}
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
        <Button type="submit" fullWidth>
          Sign up
        </Button>
      </Form>
    </Formik>
  );
};

export default SignUpForm;
