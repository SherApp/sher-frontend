import UploadItemContainer from './UploadItemContainer';
import UploadItemDetails from './UploadItemDetails';
import { Folder, Trash2 } from 'react-feather';
import React, { useState } from 'react';
import FileDragArea from '../../../components/FileDragArea';
import IconButton from '../../../components/IconButton';
import { useMutation } from 'react-query';
import { deleteDirectory } from '../../browse/apiCalls';
import useFilesUpload from '../useFilesUpload';

interface Props {
  directoryId: string;
  name: string;
}

const DirectoryUploadItem = ({ directoryId, name }: Props) => {
  const [squash, setSquash] = useState(false);

  const { uploadFiles } = useFilesUpload();

  const deleteMutation = useMutation(async () => deleteDirectory(directoryId), {
    onSuccess: () => {
      setSquash(true);
    }
  });

  const handleFilesSelected = (files: FileList) => {
    uploadFiles(files, directoryId);
  };

  // const handleClick = () => {
  //   navigateTo({ id: directoryId, name });
  // };

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteMutation.mutateAsync();
  };

  return (
    <FileDragArea onFilesSelected={handleFilesSelected}>
      {(dragIn) => (
        <UploadItemContainer highlight={dragIn} squash={squash}>
          <button
            className="w-full block text-left"
            aria-label={`open ${name} directory`}
            // onClick={handleClick}
          >
            <UploadItemDetails
              icon={<Folder />}
              name={name}
              actions={
                <div className="flex flex-grow justify-end">
                  <IconButton
                    gradient
                    aria-label="delete directory"
                    onClick={handleDeleteClick}
                  >
                    <Trash2 />
                  </IconButton>
                </div>
              }
            />
          </button>
        </UploadItemContainer>
      )}
    </FileDragArea>
  );
};

export default React.memo(DirectoryUploadItem);
