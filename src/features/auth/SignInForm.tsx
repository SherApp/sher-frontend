import TextInput from '../../components/TextInput';
import InputAdornment from '../../components/InputAdornment';
import userIcon from '../../img/user.svg';
import passwordIcon from '../../img/password.svg';
import Button from '../../components/Button';
import { useState } from 'react';
import EllipsisLoading from '../../components/EllipsisLoading';
import { signIn } from './apiCalls';
import { useHistory } from 'react-router-dom';

interface Props {
  returnPath: string;
}

const SignInForm = ({ returnPath }: Props) => {
  const history = useHistory();

  const [signingIn, setSigningIn] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSigningIn(true);

    await signIn({ emailAddress, password });

    history.push(returnPath);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailAddress(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  if (signingIn) {
    return (
      <div className="flex items-center justify-center">
        <EllipsisLoading />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex px-3 space-y-12 flex-col">
      <TextInput
        endAdornment={
          <InputAdornment>
            <img src={userIcon} alt="" />
          </InputAdornment>
        }
        fullWidth
        label="Email"
        type="email"
        placeholder="example@example.com"
        onChange={handleUsernameChange}
      />
      <TextInput
        endAdornment={
          <InputAdornment>
            <img src={passwordIcon} alt="" />
          </InputAdornment>
        }
        fullWidth
        label="Password"
        type="password"
        onChange={handlePasswordChange}
      />
      <Button type="submit">Sign in</Button>
    </form>
  );
};

export default SignInForm;
