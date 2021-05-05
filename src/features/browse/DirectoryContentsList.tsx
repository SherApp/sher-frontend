import { UserFile } from '@sherapp/sher-shared';
import { FileUploadItem, DirectoryUploadItem } from '../upload/UploadItem';
import React, { useState } from 'react';
import { deleteFile, Directory } from './apiCalls';
import useDirectoryNavigation from './useDirectoryNavigation';
import FileDragArea from '../../components/FileDragArea';
import clsx from 'clsx';

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
    <FileDragArea>
      {(dragIn) => {
        const classes = clsx(
          'border-2 border-dashed transition-colors',
          dragIn ? 'border-pink' : 'border-transparent'
        );
        return (
          <div className={classes}>
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
          </div>
        );
      }}
    </FileDragArea>
  );
};

export default DirectoryContentsList;
