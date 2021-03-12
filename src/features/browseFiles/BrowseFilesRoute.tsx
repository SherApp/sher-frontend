import Handwriting from '../../components/Handwriting';
import { useEffect, useState } from 'react';
import { deleteFile, fetchUserUploadedFiles, UserFile } from './apiCalls';
import UploadItem from '../upload/UploadItem';
import fileIcon from '../../img/file.svg';
import ecologyIcon from '../../img/ecology.svg';
import UploadLink from '../upload/UploadLink';
import { getUploadLink } from '../../sharedUtils/getUploadLink';
import IconButton from '../../components/IconButton';
import TextInput from '../../components/TextInput';

type EnhancedFile = UserFile & { hidden?: boolean };

const BrowseFilesRoute = () => {
  const [query, setQuery] = useState('');
  const [files, setFiles] = useState<EnhancedFile[]>([]);

  useEffect(() => {
    fetchUserUploadedFiles({ requiredFileNamePart: query }).then((result) =>
      setFiles(result)
    );
  }, [query]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

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
      <TextInput
        variant="contained"
        label="Search"
        fullWidth
        className="mb-2"
        value={query}
        onChange={handleQueryChange}
      />
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
