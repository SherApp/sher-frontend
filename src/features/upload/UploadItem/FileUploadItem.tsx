import UploadItemContainer from './UploadItemContainer';
import UploadItemDetails from './UploadItemDetails';
import { File, Trash2 } from 'react-feather';
import React, { useState } from 'react';
import UploadLink from '../UploadLink';
import IconButton from '../../../components/IconButton';
import { useMutation } from 'react-query';
import { useApiClient } from '../../../api/useApiClient';

interface Props {
  id?: string;
  url?: string;
  name: string;
  size: number;
  progress?: number;
  icon?: JSX.Element;
}

const FileUploadItem = ({
  id,
  url,
  name,
  size,
  progress,
  icon = <File />
}: Props) => {
  const [squash, setSquash] = useState(false);

  const apiClient = useApiClient();

  const deleteMutation = useMutation(() => apiClient.deleteFile(id ?? ''), {
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
              <UploadLink link={url} />
              {id && (
                <IconButton
                  gradient
                  aria-label="delete file"
                  className="ml-2"
                  onClick={handleDeleteClick}
                >
                  <Trash2 />
                </IconButton>
              )}
            </>
          }
        />
      </div>
    </UploadItemContainer>
  );
};

export default React.memo(FileUploadItem);
