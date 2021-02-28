import UploadCircle from './UploadCircle';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { uploadFile } from './apiCalls';
import { useOktaAuth } from '@okta/okta-react';
import UploadsList from './UploadsList';
import { Upload } from './types';

const UploadRoute = () => {
  const { authState } = useOktaAuth();
  const [uploads, setUploads] = useState<Upload[]>([]);

  const updateUploadProperty = (
    id: string,
    upload: Partial<Omit<Upload, 'id'>>
  ) => {
    setUploads((p) => p.map((u) => (u.id === id ? { ...u, ...upload } : u)));
  };

  const handleFilesSelected = (files: FileList) => {
    if (!authState.accessToken) return;

    for (const file of files) {
      const upload: Upload = {
        id: uuidv4(),
        name: file.name,
        size: file.size,
        progress: 0
      };
      setUploads((p) => [...p, upload]);
      uploadFile(
        file,
        upload.id,
        authState.accessToken.accessToken,
        (progress) => onUploadProgress(upload.id, progress)
      )
        .then(() => onUploadSuccess(upload.id))
        .catch(() => onUploadError(upload.id));
    }

    const onUploadProgress = (uploadId: string, progress: number) => {
      updateUploadProperty(uploadId, { progress });
    };

    const onUploadError = (uploadId: string) => {
      updateUploadProperty(uploadId, { error: true });
    };

    const onUploadSuccess = (uploadId: string) => {
      updateUploadProperty(uploadId, { success: true });
    };
  };

  return (
    <>
      <UploadCircle onFilesSelected={handleFilesSelected} />
      <UploadsList uploads={uploads} />
    </>
  );
};

export default UploadRoute;
