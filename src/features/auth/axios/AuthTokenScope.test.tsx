import { useOktaAuth } from '@okta/okta-react';
import { render } from '@testing-library/react';
import { axiosAuthInterceptor } from './axiosAuthInterceptor';
import AuthTokenScope from './AuthTokenScope';

jest.mock('@okta/okta-react', () => ({
  useOktaAuth: jest.fn()
}));

jest.mock('./axiosAuthInterceptor');

it('uses token interceptor', () => {
  const accessToken = '123';

  (useOktaAuth as jest.Mock).mockReturnValue({
    authState: {
      accessToken: {
        accessToken
      }
    }
  });

  (axiosAuthInterceptor as jest.Mock).mockImplementationOnce(() => jest.fn());

  render(<AuthTokenScope />);

  expect(axiosAuthInterceptor).toHaveBeenCalledWith(accessToken);
});
