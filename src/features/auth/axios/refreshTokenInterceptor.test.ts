import { refreshTokenInterceptor } from './refreshTokenInterceptor';
import config from '../../../utils/config';
import { refreshToken } from '../apiCalls';

jest.mock('../apiCalls', () => ({
  refreshToken: jest.fn()
}));

it('calls callback on refresh token request failure', () => {
  const callback = jest.fn();
  const error = {
    config: {
      url: config.api.endpoints.token.root
    },
    response: {
      status: 401
    }
  };

  refreshTokenInterceptor(callback)(error);

  expect(callback).toHaveBeenCalled();
});

it('requests refresh token on 403', () => {
  const callback = jest.fn();
  const error = {
    config: {
      url: '/fakeEndpoint'
    },
    response: {
      status: 401
    }
  };

  refreshTokenInterceptor(callback)(error);

  expect(refreshToken).toHaveBeenCalled();
  expect(callback).not.toHaveBeenCalled();
});
