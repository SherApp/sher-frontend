import TextInput from '../../components/TextInput';
import InputAdornment from '../../components/InputAdornment';
import userIcon from '../../img/user.svg';
import passwordIcon from '../../img/password.svg';
import Button from '../../components/Button';
import { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import EllipsisLoading from '../../components/EllipsisLoading';

const SignInForm = () => {
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState<string>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { sessionToken } = await oktaAuth.signInWithCredentials({
      username,
      password
    });
    setSessionToken(sessionToken);
    await oktaAuth.signInWithRedirect({ sessionToken });
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  if (sessionToken) {
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
