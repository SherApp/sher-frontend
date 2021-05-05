import { UserFile } from '@sherapp/sher-shared';
import { FileUploadItem, DirectoryUploadItem } from '../upload/UploadItem';
import React, { useState } from 'react';
import { deleteFile, Directory } from './apiCalls';
import useDirectoryNavigation from './useDirectoryNavigation';

interface Props {
  files?: UserFile[];
  directories?: Directory[];
}

const DirectoryContentsList = ({ files, directories }: Props) => {
  const [hiddenIndices, setHiddenIndices] = useState<string[]>([]);

  const handleDeleteClick = async (fileId: string) => {
    hideFile();
    await deleteFile(fileId);

    function hideFile() {
      setHiddenIndices((p) => [...p, fileId]);
    }
  };

  const { navigateTo } = useDirectoryNavigation();

  return (
    <>
      {directories?.map((d) => (
        <DirectoryUploadItem
          key={d.id}
          name={d.name}
          onClick={() => navigateTo(d.id)}
        />
      ))}
      {files
        ?.filter((f) => !f.isDeleted)
        .map((f) => (
          <FileUploadItem
            key={f.id}
            name={f.fileName}
            size={f.length}
            fileId={f.id}
            squash={hiddenIndices.includes(f.id)}
            onDeleteClick={() => handleDeleteClick(f.id)}
          />
        ))}
    </>
  );
};

export default DirectoryContentsList;
