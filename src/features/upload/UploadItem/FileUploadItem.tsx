import UploadItemContainer from './UploadItemContainer';
import UploadItemDetails from './UploadItemDetails';
import { File, Trash2 } from 'react-feather';
import React, { useState } from 'react';
import UploadLink from '../UploadLink';
import { getUploadLink } from '../../../sharedUtils/getUploadLink';
import IconButton from '../../../components/IconButton';
import { useMutation } from 'react-query';
import { deleteFile } from '../../browse/apiCalls';

interface Props {
  fileId: string;
  name: string;
  size: number;
  progress?: number;
  icon?: JSX.Element;
}

const FileUploadItem = ({
  fileId,
  name,
  size,
  progress,
  icon = <File />
}: Props) => {
  const [squash, setSquash] = useState(false);

  const deleteMutation = useMutation(() => deleteFile(fileId), {
    onSuccess: () => {
      setSquash(true);
    }
  });

  const handleDeleteClick = async () => {
    await deleteMutation.mutateAsync();
  };

  return (
    <UploadItemContainer squash={squash}>
      <div>
        <UploadItemDetails
          icon={icon}
          name={name}
          size={size}
          progress={progress}
          actions={
            <>
              <UploadLink link={getUploadLink(fileId, name)} />
              <IconButton
                gradient
                aria-label="delete file"
                className="ml-2"
                onClick={handleDeleteClick}
              >
                <Trash2 />
              </IconButton>
            </>
          }
        />
      </div>
    </UploadItemContainer>
  );
};

export default React.memo(FileUploadItem);
