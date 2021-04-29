import { useEffect, useState } from 'react';
import { Directory, listDirectory } from './apiCalls';

const useDirectory = (directoryId?: string) => {
  const [currDirectoryId, setCurrDirectoryId] = useState(directoryId);
  const [isLoading, setIsLoading] = useState(true);
  const [directory, setDirectory] = useState<Directory>();

  useEffect(() => {
    try {
      setIsLoading(true);
      listDirectory(currDirectoryId).then((dir) => setDirectory(dir));
    } finally {
      setIsLoading(false);
    }
  }, [currDirectoryId]);

  return {
    directory,
    isLoading,
    openDirectory: setCurrDirectoryId
  };
};

export default useDirectory;
