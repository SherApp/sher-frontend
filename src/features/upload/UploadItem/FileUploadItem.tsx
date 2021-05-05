import UploadItemContainer from './UploadItemContainer';
import UploadItemDetails from './UploadItemDetails';
import { File, Trash } from 'react-feather';
import React from 'react';
import UploadLink from '../UploadLink';
import { getUploadLink } from '../../../sharedUtils/getUploadLink';
import IconButton from '../../../components/IconButton';

interface Props {
  fileId: string;
  name: string;
  size: number;
  progress?: number;
  onDeleteClick?(): void;
  squash?: boolean;
  icon?: JSX.Element;
}

const FileUploadItem = ({
  fileId,
  name,
  size,
  progress,
  onDeleteClick,
  squash,
  icon = <File />
}: Props) => {
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
                onClick={onDeleteClick}
              >
                <Trash />
              </IconButton>
            </>
          }
        />
      </div>
    </UploadItemContainer>
  );
};

export default FileUploadItem;
