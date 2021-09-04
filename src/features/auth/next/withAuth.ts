import { GetServerSideProps } from 'next';
import axios from 'axios';
import config from '../../../utils/config';
import {
  AUTH_REQUIRED_MESSAGE,
  refreshTokenInterceptor
} from '@sherapp/sher-shared';
import setCookie from 'set-cookie-parser';
import ApiClient from '../../../api/apiClient';

export type GetServerSidePropsWithApi = GetServerSideProps extends (
  ...a: infer U
) => infer R
  ? (client: ApiClient, ...a: U) => R
  : never;

type WithAuth = (
  getServerSideProps: GetServerSidePropsWithApi
) => GetServerSideProps;

export const withAuth: WithAuth = (
  getServerSideProps: GetServerSidePropsWithApi
) => async (context) => {
  const client = axios.create({
    baseURL: config.api.absoluteUrl + config.api.baseUrl,
    withCredentials: true
  });

  if (context.req.headers.cookie) {
    client.defaults.headers = {
      cookie: context.req.headers.cookie
    };
  }

  const retryInstance = axios.create({
    baseURL: client.defaults.baseURL
  });

  const refreshToken = async () => {
    const { headers } = await client.post(config.api.endpoints.token.root, {});
    context.res.setHeader('set-cookie', headers['set-cookie']);

    const cookies = setCookie.parse(headers['set-cookie']);

    const jwtCookie = cookies.find((c) => c.name === 'JwtToken');

    retryInstance.defaults.headers = {
      Authorization: `Bearer ${jwtCookie?.value}`
    };
  };

  client.interceptors.response.use(
    undefined,
    refreshTokenInterceptor(
      retryInstance,
      () => {},
      refreshToken,
      config.api.endpoints.token.root
    )
  );

  const apiClient = new ApiClient(client);

  try {
    return await getServerSideProps(apiClient, context);
  } catch (e: any) {
    if (e.message === AUTH_REQUIRED_MESSAGE) {
      return {
        redirect: {
          destination: '/auth/signIn',
          permanent: false
        }
      };
    }

    throw e;
  }
};
