import { UserFile } from '@sherapp/sher-shared';
import { FileUploadItem, DirectoryUploadItem } from '../upload/UploadItem';
import React from 'react';
import { Directory } from './apiCalls';
import FileDragArea from '../../components/FileDragArea';
import clsx from 'clsx';
import { Upload } from '@sherapp/sher-shared/upload';
import useFilesUpload from '../upload/useFilesUpload';

interface Props {
  directoryId: string;
  files?: UserFile[];
  directories?: Directory[];
  uploads?: Upload[];
}

const DirectoryContentsList = ({ directoryId, files, directories }: Props) => {
  const { uploadFiles } = useFilesUpload();

  const handleFilesDropped = (files: FileList) => {
    uploadFiles(files, directoryId);
  };

  return (
    <FileDragArea onFilesSelected={handleFilesDropped}>
      {(dragIn) => {
        const classes = clsx(
          'border-2 border-dashed transition-colors',
          dragIn ? 'border-pink' : 'border-transparent'
        );
        return (
          <div className={classes}>
            {directories
              ?.filter((d) => !d.isDeleted)
              ?.map((d) => (
                <DirectoryUploadItem
                  key={d.id}
                  directoryId={d.id}
                  name={d.name}
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
                />
              ))}
          </div>
        );
      }}
    </FileDragArea>
  );
};

export default React.memo(DirectoryContentsList);
