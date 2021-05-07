import { useEffect, useState } from 'react';
import { createDirectory, Directory, listDirectory } from './apiCalls';
import { v4 as uuidv4 } from 'uuid';

const useDirectory = (directoryId?: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [directory, setDirectory] = useState<Directory>();

  useEffect(() => {
    try {
      setIsLoading(true);
      listDirectory(directoryId).then((dir) => {
        setDirectory(dir);
      });
    } finally {
      setIsLoading(false);
    }
  }, [directoryId]);

  const createChildDirectory = async (name: string) => {
    const id = uuidv4();

    await createDirectory({
      id,
      parentDirectoryId: directoryId,
      name
    });

    setDirectory((prev) => {
      if (!prev?.directories) return prev;

      return {
        ...prev,
        directories: [
          ...prev.directories,
          {
            id,
            name,
            parentDirectoryId: directoryId,
            files: [],
            directories: []
          }
        ]
      };
    });
  };

  return {
    directory: isLoading ? undefined : directory,
    isLoading,
    createChildDirectory
  };
};

export default useDirectory;
