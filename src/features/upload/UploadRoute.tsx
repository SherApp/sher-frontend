import UploadCircle from './UploadCircle';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { uploadFile } from './apiCalls';
import { useOktaAuth } from '@okta/okta-react';

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
    <div>
      <UploadCircle onFilesSelected={handleFilesSelected} />
      {uploads.map((u) => (
        <p>
          {u.id} - {u.name} - {u.progress ?? 0}
        </p>
      ))}
    </div>
  );
};

export default UploadRoute;
