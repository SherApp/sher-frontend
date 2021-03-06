import Handwriting from '../../components/Handwriting';
import { useEffect, useState } from 'react';
import { deleteFile, fetchUserUploadedFiles, UserFile } from './apiCalls';
import UploadItem from '../upload/UploadItem';
import fileIcon from '../../img/file.svg';
import ecologyIcon from '../../img/ecology.svg';
import UploadLink from '../upload/UploadLink';
import { getUploadLink } from '../../sharedUtils/getUploadLink';
import IconButton from '../../components/IconButton';

type EnhancedFile = UserFile & { hidden?: boolean };

const BrowseFilesRoute = () => {
  const [files, setFiles] = useState<EnhancedFile[]>([]);

  useEffect(() => {
    fetchUserUploadedFiles().then((result) => setFiles(result));
  }, []);

  const handleDeleteClick = async (fileId: string) => {
    hideFile();
    await deleteFile(fileId);

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
            squash={f.hidden}
          />
        ))}
    </div>
  );
};

export default BrowseFilesRoute;
