import { UserFile } from '@sherapp/sher-shared';
import UploadItem from '../upload/UploadItem';
import fileIcon from '../../img/file.svg';
import UploadLink from '../upload/UploadLink';
import { getUploadLink } from '../../sharedUtils/getUploadLink';
import IconButton from '../../components/IconButton';
import ecologyIcon from '../../img/ecology.svg';
import React, { useState } from 'react';
import { deleteFile } from './apiCalls';

interface Props {
  files?: UserFile[];
}

const DirectoryFilesList = ({ files }: Props) => {
  const [hiddenIndices, setHiddenIndices] = useState<string[]>([]);

  const handleDeleteClick = async (fileId: string) => {
    hideFile();
    await deleteFile(fileId);

    function hideFile() {
      setHiddenIndices((p) => [...p, fileId]);
    }
  };

  return (
    <>
      {files
        ?.filter((f) => !f.isDeleted)
        .map((f) => (
          <UploadItem
            icon={<img src={fileIcon} alt="" />}
            key={f.id}
            name={f.fileName}
            size={f.length}
            actions={
              <>
                <UploadLink link={getUploadLink(f.id, f.fileName)} />
                <IconButton
                  aria-label="delete file"
                  className="ml-2"
                  onClick={() => handleDeleteClick(f.id)}
                >
                  <img src={ecologyIcon} alt="" />
                </IconButton>
              </>
            }
            squash={hiddenIndices.includes(f.id)}
          />
        ))}
    </>
  );
};

export default DirectoryFilesList;
