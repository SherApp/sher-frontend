import { useEffect, useState } from 'react';
import { createDirectory, Directory, listDirectory } from './apiCalls';
import { v4 as uuidv4 } from 'uuid';
import { useUploadsInfo } from '../upload/UploadsInfoContext';
import { uploadToFile } from './uploadToFile';

const useDirectory = (directoryId?: string) => {
  const { uploads } = useUploadsInfo();
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

  let dir = directory;

  if (dir && uploads) {
    dir = {
      ...dir,
      files: [
        ...dir.files,
        ...uploads
          .filter((u) => u.directoryId === dir?.id && u.success)
          .map(uploadToFile)
      ]
    };
  }

  return {
    directory: isLoading ? undefined : dir,
    isLoading,
    createChildDirectory
  };
};

export default useDirectory;
