import { axiosAuthInterceptor } from './axiosAuthInterceptor';
import { AxiosRequestConfig } from 'axios';

it('sets auth header with passed token', () => {
  const accessToken = '123';

  const interceptor = axiosAuthInterceptor(accessToken);

  let cfg: AxiosRequestConfig = { headers: {} };
  cfg = interceptor(cfg);

  expect(cfg.headers['Authorization']).toEqual(`Bearer ${accessToken}`);
});
