import Handwriting from '../../components/Handwriting';
import { useEffect, useState } from 'react';
import { deleteFile, fetchUserUploadedFiles, UserFile } from './apiCalls';
import { useOktaAuth } from '@okta/okta-react';
import UploadItem from '../upload/UploadItem';
import fileIcon from '../../img/file.svg';
import ecologyIcon from '../../img/ecology.svg';
import UploadLink from '../upload/UploadLink';
import { getUploadLink } from '../../sharedUtils/getUploadLink';
import IconButton from '../../components/IconButton';

type EnhancedFile = UserFile & { hidden?: boolean };

const BrowseFilesRoute = () => {
  const { authState } = useOktaAuth();
  const [files, setFiles] = useState<EnhancedFile[]>([]);

  useEffect(() => {
    if (!authState.accessToken) return;

    fetchUserUploadedFiles(authState.accessToken.accessToken).then((result) =>
      setFiles(result)
    );
  }, [authState]);

  const handleDeleteClick = async (fileId: string) => {
    if (!authState.accessToken) return;

    hideFile();
    await deleteFile(fileId, authState.accessToken?.accessToken);

    function hideFile() {
      setFiles(
        files.map((f) => (f.id !== fileId ? f : { ...f, hidden: true }))
      );
    }
  };

  return (
    <div className="container mt-40">
      <Handwriting variant="h2" component="h1">
        Files
      </Handwriting>
      {files
        .filter((f) => !f.isDeleted)
        .map((f) => (
          <UploadItem
            icon={<img src={fileIcon} alt="" />}
            key={f.id}
            name={f.originalFileName}
            size={f.length}
            actions={
              <>
                <UploadLink link={getUploadLink(f.id, f.originalFileName)} />
                <IconButton
                  className="ml-2"
                  onClick={() => handleDeleteClick(f.id)}
                >
                  <img src={ecologyIcon} alt="" />
                </IconButton>
              </>
            }
            squash={f.hidden}
          />
        ))}
    </div>
  );
};

export default BrowseFilesRoute;
