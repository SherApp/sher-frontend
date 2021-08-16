import { UserFile, Directory } from '@sherapp/sher-shared';
import { FileUploadItem, DirectoryUploadItem } from '../upload/UploadItem';
import React from 'react';
import FileDragArea from '../../components/FileDragArea';
import clsx from 'clsx';
import useFilesUpload from '../upload/useFilesUpload';
import config from '../../utils/config';

interface Props {
  directoryId: string;
  files?: UserFile[];
  directories?: Directory[];
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
            {files?.map((f) => (
              <FileUploadItem
                key={f.id}
                name={f.fileName}
                size={f.length}
                url={`${config.api.absoluteUrl}/api/file/${f.id}`}
                id={f.id}
              />
            ))}
          </div>
        );
      }}
    </FileDragArea>
  );
};

export default React.memo(DirectoryContentsList);
