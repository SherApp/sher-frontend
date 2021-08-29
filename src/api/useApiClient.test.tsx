import { useApiClient } from './useApiClient';
import { render } from '@testing-library/react';
import { refreshTokenInterceptor } from '@sherapp/sher-shared';
import axios from 'axios';

// TODO: Is the component required at all?
const TestComponent = () => {
  useApiClient();

  return null;
};

jest.mock('axios');
jest.mock('@sherapp/sher-shared');

it('uses refresh token interceptor when called with anonymous = false', () => {
  const interceptor = jest.fn();
  (refreshTokenInterceptor as jest.Mock).mockImplementationOnce(
    () => interceptor
  );

  const axiosInstanceMock = {
    interceptors: {
      response: {
        use: jest.fn()
      }
    }
  };

  (axios.create as jest.Mock).mockReturnValueOnce(axiosInstanceMock);

  render(<TestComponent />);

  expect(axiosInstanceMock.interceptors.response.use).toHaveBeenCalledWith(
    expect.anything(),
    interceptor
  );
});
