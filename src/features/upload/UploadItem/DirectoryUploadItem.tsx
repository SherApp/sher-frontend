import UploadItemContainer from './UploadItemContainer';
import UploadItemDetails from './UploadItemDetails';
import { Folder, Trash2 } from 'react-feather';
import React from 'react';
import FileDragArea from '../../../components/FileDragArea';
import IconButton from '../../../components/IconButton';

interface Props {
  directoryId: string;
  name: string;
  squash?: boolean;
  onClick?(directoryId: string): void;
  onDeleteClick?(directoryId: string): void;
  onFilesDropped?(directoryId: string, files: FileList): void;
}

const DirectoryUploadItem = ({
  directoryId,
  name,
  squash,
  onClick,
  onDeleteClick,
  onFilesDropped
}: Props) => {
  const handleFilesSelected = (files: FileList) => {
    onFilesDropped?.(directoryId, files);
  };

  const handleClick = () => {
    onClick?.(directoryId);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteClick?.(directoryId);
  };

  return (
    <FileDragArea onFilesSelected={handleFilesSelected}>
      {(dragIn) => (
        <UploadItemContainer highlight={dragIn} squash={squash}>
          <button
            className="w-full block text-left"
            aria-label={`open ${name} directory`}
            onClick={handleClick}
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
