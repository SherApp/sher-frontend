import { createDirectory, listDirectory } from './apiCalls';
import { v4 as uuidv4 } from 'uuid';
import { useQuery } from 'react-query';

const useDirectory = (directoryId?: string) => {
  const { data: directory, isLoading, refetch } = useQuery(
    ['listDirectory', directoryId],
    () => listDirectory(directoryId)
  );

  const createChildDirectory = async (name: string) => {
    const id = uuidv4();

    await createDirectory({
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
