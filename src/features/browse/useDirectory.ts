import { useEffect, useState } from 'react';
import { createDirectory, Directory, listDirectory } from './apiCalls';
import { v4 as uuidv4 } from 'uuid';

const useDirectory = (directoryId?: string) => {
  const [path, setPath] = useState<Directory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [directory, setDirectory] = useState<Directory>();

  useEffect(() => {
    try {
      setIsLoading(true);
      listDirectory(directoryId).then((dir) => {
        setDirectory(dir);
        setPath((prev) => {
          const index = prev.findIndex((d) => d.id === dir.id);
          if (index !== -1) {
            return prev.slice(0, index + 1);
          }
          return [...prev, dir];
        });
      });
    } finally {
      setIsLoading(false);
    }
  }, [directoryId]);

  useEffect(() => {}, [directory]);

  const createChildDirectory = async (name: string) => {
    const id = uuidv4();

    await createDirectory({
      id,
      parentDirectoryId: directoryId,
      name
    });

    directory?.directories.push({
      id,
      name,
      parentDirectoryId: directoryId,
      files: [],
      directories: []
    });
  };

  return {
    directory: isLoading ? undefined : directory,
    isLoading,
    createChildDirectory,
    path
  };
};

export default useDirectory;
