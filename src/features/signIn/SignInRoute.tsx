import TextInput from '../../components/TextInput';
import InputAdornment from '../../components/InputAdornment';
import user from '../../img/user.svg';
import password from '../../img/password.svg';
import Button from '../../components/Button';
import Handwriting from '../../components/Handwriting';

const SignInRoute = () => {
  return (
    <div className="flex flex-grow flex-col justify-center items-center">
      <Handwriting variant="h2" component="h1" className="py-4 mb-6">
        sher.lol
      </Handwriting>
      <div className="md:w-1/2 xl:w-1/4 relative">
        <div className="w-full h-full bg-gradient-r-purple-pink absolute transform rotate-6 rounded-xl top-0 left-0 -z-10"/>
        <div className="px-8 py-10 shadow-xl bg-white rounded-xl">
          <Handwriting variant="h3" component="h2" className="py-4 mb-6">
            Sign in
          </Handwriting>
          <form className="flex px-3 space-y-12 flex-col">
            <TextInput endAdornment={
              <InputAdornment>
                <img src={user} alt=""/>
              </InputAdornment>
            } fullWidth label="Email" InputProps={{type: 'email', placeholder: 'example@example.com'}}/>
            <TextInput endAdornment={
              <InputAdornment>
                <img src={password} alt=""/>
              </InputAdornment>
            } fullWidth label="Password" InputProps={{type: 'password'}}/>
            <Button>Sign in</Button>
          </form>
        </div>
      </div>
    </div>
  )
};

export default SignInRoute;
