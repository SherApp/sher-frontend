import UploadCircle from './UploadCircle';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { uploadFile } from './apiCalls';
import { useOktaAuth } from '@okta/okta-react';
import UploadItem from './UploadItem';

interface Upload {
  id: string;
  name: string;
  size: number;
  progress?: number;
}

const UploadRoute = () => {
  const { authState } = useOktaAuth();
  const [uploads, setUploads] = useState<Upload[]>([]);

  const handleFilesSelected = (files: FileList) => {
    if (!authState.accessToken) return;

    for (const file of files) {
      const upload: Upload = {
        id: uuidv4(),
        name: file.name,
        size: file.size
      };
      setUploads((p) => [...p, upload]);
      uploadFile(
        file,
        upload.id,
        authState.accessToken.accessToken,
        (progress) => {
          setUploads((p) =>
            p.map((u) => (u.id === upload.id ? { ...u, progress } : u))
          );
        }
      );
    }
  };
  return (
    <>
      <UploadCircle onFilesSelected={handleFilesSelected} />
      <div className="flex flex-col my-8 sm:w-full md:w-4/5 xl:w-3/5">
        {uploads.map((u) => (
          <UploadItem
            status={u.progress !== 100 ? 'pending' : 'success'}
            name={u.name}
            size={u.size}
            link={u.id}
            progress={u.progress}
          />
        ))}
      </div>
    </>
  );
};

export default UploadRoute;
