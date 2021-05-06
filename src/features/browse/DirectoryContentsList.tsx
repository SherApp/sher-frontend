import { UserFile } from '@sherapp/sher-shared';
import { FileUploadItem, DirectoryUploadItem } from '../upload/UploadItem';
import React, { useCallback, useState } from 'react';
import { deleteFile, Directory } from './apiCalls';
import useDirectoryNavigation from './useDirectoryNavigation';
import FileDragArea from '../../components/FileDragArea';
import clsx from 'clsx';
import { Upload } from '@sherapp/sher-shared/upload';

interface Props {
  files?: UserFile[];
  directories?: Directory[];
  uploads?: Upload[];
  onFilesDropped?(files: FileList, directoryId?: string): void;
}

const DirectoryContentsList = ({
  files,
  directories,
  onFilesDropped
}: Props) => {
  const [hiddenIndices, setHiddenIndices] = useState<string[]>([]);

  const { navigateTo } = useDirectoryNavigation();

  const FileComponent = ({ file }: { file: UserFile }) => {
    const handleDeleteClick = useCallback(async () => {
      hideFile();
      await deleteFile(file.id);

      function hideFile() {
        setHiddenIndices((p) => [...p, file.id]);
      }
    }, [file]);

    return (
      <FileUploadItem
        key={file.id}
        name={file.fileName}
        size={file.length}
        fileId={file.id}
        squash={hiddenIndices.includes(file.id)}
        onDeleteClick={handleDeleteClick}
      />
    );
  };

  const DirectoryComponent = ({ directory }: { directory: Directory }) => {
    const handleClick = useCallback(() => {
      navigateTo(directory.id);
    }, [directory]);

    const handleFilesDropped = useCallback(
      (files: FileList) => {
        onFilesDropped?.(files, directory.id);
      },
      [directory]
    );

    return (
      <DirectoryUploadItem
        key={directory.id}
        name={directory.name}
        onClick={handleClick}
        onFilesDropped={handleFilesDropped}
      />
    );
  };

  return (
    <FileDragArea onFilesSelected={onFilesDropped}>
      {(dragIn) => {
        const classes = clsx(
          'border-2 border-dashed transition-colors',
          dragIn ? 'border-pink' : 'border-transparent'
        );
        return (
          <div className={classes}>
            {directories?.map((d) => (
              <DirectoryComponent key={d.id} directory={d} />
            ))}
            {files
              ?.filter((f) => !f.isDeleted)
              .map((f) => (
                <FileComponent key={f.id} file={f} />
              ))}
          </div>
        );
      }}
    </FileDragArea>
  );
};

export default React.memo(DirectoryContentsList);
