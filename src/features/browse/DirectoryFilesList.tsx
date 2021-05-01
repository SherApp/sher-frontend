import { UserFile } from '@sherapp/sher-shared';
import UploadItem from '../upload/UploadItem';
import UploadLink from '../upload/UploadLink';
import { getUploadLink } from '../../sharedUtils/getUploadLink';
import IconButton from '../../components/IconButton';
import ecologyIcon from '../../img/ecology.svg';
import React, { useState } from 'react';
import { deleteFile, Directory } from './apiCalls';
import { Folder, File } from 'react-feather';
import { useHistory } from 'react-router-dom';

interface Props {
  files?: UserFile[];
  directories?: Directory[];
}

const DirectoryFilesList = ({ files, directories }: Props) => {
  const history = useHistory();
  const [hiddenIndices, setHiddenIndices] = useState<string[]>([]);

  const handleDeleteClick = async (fileId: string) => {
    hideFile();
    await deleteFile(fileId);

    function hideFile() {
      setHiddenIndices((p) => [...p, fileId]);
    }
  };

  const handleFolderClick = (folderId: string) => {
    history.push({
      pathname: '/browse',
      search: `?directoryId=${folderId}`
    });
  };

  return (
    <>
      {directories?.map((d) => (
        <UploadItem
          icon={<Folder />}
          name={d.name}
          onClick={() => handleFolderClick(d.id)}
        />
      ))}
      {files
        ?.filter((f) => !f.isDeleted)
        .map((f) => (
          <UploadItem
            icon={<File />}
            key={f.id}
            name={f.fileName}
            size={f.length}
            actions={
              <>
                <UploadLink link={getUploadLink(f.id, f.fileName)} />
                <IconButton
                  gradient
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
