import { GetServerSideProps } from 'next';
import axios, { AxiosInstance } from 'axios';
import config from '../../../utils/config';
import { refreshTokenInterceptor } from '@sherapp/sher-shared';

export type GetServerSidePropsWithApi = GetServerSideProps extends (
  ...a: infer U
) => infer R
  ? (client: AxiosInstance, ...a: U) => R
  : never;

type WithAuth = (
  getServerSideProps: GetServerSidePropsWithApi
) => GetServerSideProps;

export const withAuth: WithAuth = (
  getServerSideProps: GetServerSidePropsWithApi
) => async (context) => {
  const client = axios.create({
    baseURL: config.api.absoluteUrl + config.api.baseUrl,
    withCredentials: true,
    headers: {
      cookie: context.req.headers.cookie
    }
  });

  const refreshToken = () => client.post(config.api.endpoints.token.root, {});

  client.interceptors.response.use(
    undefined,
    refreshTokenInterceptor(
      client,
      () => {},
      refreshToken,
      config.api.endpoints.token.root
    )
  );

  return await getServerSideProps(client, context);
};
