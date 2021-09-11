import { QueryClient } from 'react-query';
import { withAuth } from '../../features/auth/next/withAuth';
import BrowseRoute from '../../features/browse/BrowseRoute';
import { dehydrateState } from '../../utils/dehydrateState';
import Header from '../../components/Header';
import React from 'react';

const Browse = () => {
  return (
    <>
      <Header />
      <BrowseRoute />
    </>
  );
};

export const getServerSideProps = withAuth(async (apiClient, { query }) => {
  const queryClient = new QueryClient();

  const { id } = query;

  await queryClient.fetchQuery(['listDirectory', id], () =>
    apiClient.listDirectory(id as string)
  );

  await queryClient.fetchQuery('user', () => apiClient.getUser());

  return {
    props: {
      dehydratedState: dehydrateState(queryClient)
    }
  };
});

export default Browse;
