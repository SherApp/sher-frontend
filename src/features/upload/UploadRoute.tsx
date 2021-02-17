import UploadCircle from './UploadCircle';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { uploadFile } from './apiCalls';
import { useOktaAuth } from '@okta/okta-react';
import UploadItem from './UploadItem';
import config from '../../utils/config';

interface Upload {
  id: string;
  name: string;
  size: number;
  progress?: number;
  error?: boolean;
  success?: boolean;
}

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
        size: file.size
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

  const getUploadStatus = (upload: Upload) => {
    if (upload.error) {
      return 'failure';
    } else if (!upload.success) {
      return 'pending';
    }
    return 'success';
  };

  const getUploadLink = (upload: Upload) =>
    encodeURI(`${config.uploads.url}${upload.id}/${upload.name}`);

  return (
    <>
      <UploadCircle onFilesSelected={handleFilesSelected} />
      <div className="flex flex-col my-8 sm:w-full md:w-4/5 xl:w-3/5">
        {uploads.map((u) => (
          <UploadItem
            status={getUploadStatus(u)}
            name={u.name}
            size={u.size}
            link={getUploadLink(u)}
            progress={u.progress}
          />
        ))}
      </div>
    </>
  );
};

export default UploadRoute;
