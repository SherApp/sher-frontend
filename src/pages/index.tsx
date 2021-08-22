import { QueryClient } from 'react-query';
import { listDirectory } from '../features/browse/apiCalls';
import { withAuth } from '../features/auth/next/withAuth';
import { dehydrate } from 'react-query/hydration';
import BrowseRoute from '../features/browse/BrowseRoute';

interface QueryParams {
  directoryId?: string;
}

const Browse = () => {
  return <BrowseRoute />;
};

export const getServerSideProps = withAuth(async (apiClient, { query }) => {
  const queryClient = new QueryClient();

  const { directoryId } = query as QueryParams;

  await queryClient.prefetchQuery(['listDirectory', directoryId], async () => {
    const { data } = await apiClient.get(
      directoryId ? `/directory/${directoryId}` : '/directory'
    );
    return data;
  });

  const data = queryClient.getQueryData(['listDirectory', directoryId]);

  console.log(data);

  if (!data) {
    return {
      redirect: {
        destination: '/auth/signIn',
        permanent: false
      }
    };
  }

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient)))
    }
  };
});

export default Browse;
