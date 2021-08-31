import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

export const dehydrateState = (queryClient: QueryClient) =>
  JSON.parse(JSON.stringify(dehydrate(queryClient)));
