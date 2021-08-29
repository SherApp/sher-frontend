import { v4 as uuidv4 } from 'uuid';
import { useQuery } from 'react-query';
import { useApiClient } from '../../api/useApiClient';

const useDirectory = (directoryId?: string) => {
  const apiClient = useApiClient();

  const { data: directory, isLoading, refetch } = useQuery(
    ['listDirectory', directoryId],
    () => apiClient.listDirectory(directoryId)
  );

  const createChildDirectory = async (name: string) => {
    const id = uuidv4();

    await apiClient.createDirectory({
      id,
      parentDirectoryId: directoryId,
      name
    });

    await refetch();
  };

  return {
    directory,
    isLoading,
    createChildDirectory
  };
};

export default useDirectory;
