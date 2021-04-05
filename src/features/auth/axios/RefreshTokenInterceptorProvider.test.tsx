import { render } from '@testing-library/react';
import RefreshTokenInterceptorProvider from './RefreshTokenInterceptorProvider';
import { refreshTokenInterceptor } from './refreshTokenInterceptor';
import apiClient from '../../../api/apiClient';
import { useHistory, useLocation } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
  useLocation: jest.fn()
}));

jest.mock('./refreshTokenInterceptor');

it('uses refresh token interceptor', () => {
  const interceptor = jest.fn();
  (refreshTokenInterceptor as jest.Mock).mockImplementationOnce(
    () => interceptor
  );
  (useLocation as jest.Mock).mockReturnValue({
    pathname: '/'
  });
  (useHistory as jest.Mock).mockReturnValue({
    push: jest.fn()
  });

  const spy = jest.spyOn(apiClient.interceptors.response, 'use');

  render(<RefreshTokenInterceptorProvider />);

  expect(spy).toHaveBeenCalledWith(expect.anything(), interceptor);
});
