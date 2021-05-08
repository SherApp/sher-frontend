import { UserFile } from '@sherapp/sher-shared';
import { FileUploadItem, DirectoryUploadItem } from '../upload/UploadItem';
import React, { useCallback, useState } from 'react';
import { deleteFile, Directory } from './apiCalls';
import FileDragArea from '../../components/FileDragArea';
import clsx from 'clsx';
import { Upload } from '@sherapp/sher-shared/upload';

interface Props {
  directoryId: string;
  files?: UserFile[];
  directories?: Directory[];
  uploads?: Upload[];
  onFilesDropped?(directoryId: string, files: FileList): void;
  onDirectoryClick?(directoryId: string): void;
}

const DirectoryContentsList = ({
  directoryId,
  files,
  directories,
  onFilesDropped,
  onDirectoryClick
}: Props) => {
  const [hiddenIndices, setHiddenIndices] = useState<string[]>([]);

  const handleFilesDropped = (files: FileList) => {
    onFilesDropped?.(directoryId, files);
  };

  const handleFileDeleteClick = useCallback(async (fileId: string) => {
    hideFile();
    await deleteFile(fileId);

    function hideFile() {
      setHiddenIndices((p) => [...p, fileId]);
    }
  }, []);

  return (
    <FileDragArea onFilesSelected={handleFilesDropped}>
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
                directoryId={d.id}
                name={d.name}
                onClick={onDirectoryClick}
                onFilesDropped={onFilesDropped}
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
                  onDeleteClick={handleFileDeleteClick}
                />
              ))}
          </div>
        );
      }}
    </FileDragArea>
  );
};

export default React.memo(DirectoryContentsList);
