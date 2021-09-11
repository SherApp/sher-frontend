import { QueryClient } from 'react-query';
import { withAuth } from '../features/auth/next/withAuth';
import BrowseRoute from '../features/browse/BrowseRoute';
import { dehydrateState } from '../utils/dehydrateState';
import Header from '../components/Header';
import React from 'react';

const Browse = () => {
  return (
    <>
      <Header />
      <BrowseRoute />
    </>
  );
};

export const getServerSideProps = withAuth(async (apiClient) => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery('user', () => apiClient.getUser());

  await queryClient.fetchQuery(['listDirectory', undefined], () =>
    apiClient.listDirectory()
  );

  return {
    props: {
      dehydratedState: dehydrateState(queryClient)
    }
  };
});

export default Browse;
