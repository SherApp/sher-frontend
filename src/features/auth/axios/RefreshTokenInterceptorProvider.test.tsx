import { render } from '@testing-library/react';
import RefreshTokenInterceptorProvider from './RefreshTokenInterceptorProvider';
import { refreshTokenInterceptor } from './refreshTokenInterceptor';
import apiClient from '../../../api/apiClient';

jest.mock('./refreshTokenInterceptor');

it('uses refresh token interceptor', () => {
  const interceptor = jest.fn();
  (refreshTokenInterceptor as jest.Mock).mockImplementationOnce(
    () => interceptor
  );

  const spy = jest.spyOn(apiClient.interceptors.response, 'use');

  render(<RefreshTokenInterceptorProvider />);

  expect(spy).toHaveBeenCalledWith(expect.anything(), interceptor);
});
