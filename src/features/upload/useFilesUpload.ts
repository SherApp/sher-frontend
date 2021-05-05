import { Upload } from '@sherapp/sher-shared/upload';
import { v4 as uuidv4 } from 'uuid';
import { uploadFile } from './apiCalls';
import { useState } from 'react';

const useFilesUpload = () => {
  const [uploads, setUploads] = useState<Upload[]>([]);

  const updateUploadProperty = (
    id: string,
    upload: Partial<Omit<Upload, 'id'>>
  ) => {
    setUploads((p) => p.map((u) => (u.id === id ? { ...u, ...upload } : u)));
  };

  const uploadFiles = (files: FileList, directoryId?: string) => {
    for (const file of files) {
      const upload: Upload = {
        id: uuidv4(),
        name: file.name,
        size: file.size,
        progress: 0
      };

      setUploads((p) => [...p, upload]);

      uploadFile(file, upload.id, directoryId, (progress) =>
        onUploadProgress(upload.id, progress)
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

  return { uploadFiles, uploads };
};

export default useFilesUpload;
