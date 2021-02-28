import Handwriting from '../../components/Handwriting';
import { useEffect, useState } from 'react';
import { fetchUserUploadedFiles, UserFile } from './apiCalls';
import { useOktaAuth } from '@okta/okta-react';
import UploadItem from '../upload/UploadItem';
import fileIcon from '../../img/file.svg';
import UploadLink from '../upload/UploadLink';
import { getUploadLink } from '../../sharedUtils/getUploadLink';

const BrowseFilesRoute = () => {
  const { authState } = useOktaAuth();
  const [files, setFiles] = useState<UserFile[]>([]);

  useEffect(() => {
    if (!authState.accessToken) return;

    fetchUserUploadedFiles(authState.accessToken.accessToken).then((result) =>
      setFiles(result)
    );
  }, [authState]);

  return (
    <div className="container mt-40">
      <Handwriting variant="h2" component="h1">
        Files
      </Handwriting>
      {files.map((f) => (
        <UploadItem
          icon={<img src={fileIcon} alt="" />}
          key={f.id}
          name={f.originalFileName}
          size={f.length}
          actions={
            <>
              <UploadLink link={getUploadLink(f.id, f.originalFileName)} />
            </>
          }
        />
      ))}
    </div>
  );
};

export default BrowseFilesRoute;
