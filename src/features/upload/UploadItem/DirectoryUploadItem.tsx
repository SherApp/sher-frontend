import UploadItemContainer from './UploadItemContainer';
import UploadItemDetails from './UploadItemDetails';
import { Folder } from 'react-feather';
import React from 'react';
import FileDragArea from '../../../components/FileDragArea';

interface Props {
  name: string;
  onClick?(): void;
}

const DirectoryUploadItem = ({ name, onClick }: Props) => {
  return (
    <FileDragArea>
      {(dragIn) => (
        <UploadItemContainer highlight={dragIn}>
          <button
            className="w-full block text-left"
            aria-label={`open ${name} directory`}
            onClick={onClick}
          >
            <UploadItemDetails icon={<Folder />} name={name} />
          </button>
        </UploadItemContainer>
      )}
    </FileDragArea>
  );
};

export default DirectoryUploadItem;
