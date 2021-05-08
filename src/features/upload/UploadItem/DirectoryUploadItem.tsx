import UploadItemContainer from './UploadItemContainer';
import UploadItemDetails from './UploadItemDetails';
import { Folder } from 'react-feather';
import React from 'react';
import FileDragArea from '../../../components/FileDragArea';

interface Props {
  directoryId: string;
  name: string;
  onClick?(directoryId: string): void;
  onFilesDropped?(directoryId: string, files: FileList): void;
}

const DirectoryUploadItem = ({
  directoryId,
  name,
  onClick,
  onFilesDropped
}: Props) => {
  const handleFilesSelected = (files: FileList) => {
    onFilesDropped?.(directoryId, files);
  };

  const handleClick = () => {
    onClick?.(directoryId);
  };

  return (
    <FileDragArea onFilesSelected={handleFilesSelected}>
      {(dragIn) => (
        <UploadItemContainer highlight={dragIn}>
          <button
            className="w-full block text-left"
            aria-label={`open ${name} directory`}
            onClick={handleClick}
          >
            <UploadItemDetails icon={<Folder />} name={name} />
          </button>
        </UploadItemContainer>
      )}
    </FileDragArea>
  );
};

export default React.memo(DirectoryUploadItem);
