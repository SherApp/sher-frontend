import { Upload } from '@sherapp/sher-shared';
import { v4 as uuidv4 } from 'uuid';
import { uploadFile, cancelUpload as apiCancelUpload } from './apiCalls';
import { useUploadsInfo } from './UploadsInfoContext';

const useFilesUpload = () => {
  const { addOrUpdateUpload, uploads } = useUploadsInfo();

  const uploadFiles = (
    files: FileList,
    directoryId: string,
    onFileUploaded?: (upload: Upload) => void
  ) => {
    for (const file of files) {
      const upload: Upload = {
        key: uuidv4(),
        name: file.name,
        size: file.size,
        progress: 0,
        directoryId: directoryId,
        status: 'uploading'
      };

      addOrUpdateUpload?.(upload);

      uploadFile(upload.key, file, upload.name, directoryId, {
        onProgress: (url, bytesSent, bytesTotal) =>
          onUploadProgress(upload.key, url, (bytesSent / bytesTotal) * 100),
        onSuccess: () => onUploadSuccess(upload),
        onError: () => onUploadError(upload.key)
      });
    }

    const onUploadProgress = (
      uploadKey: string,
      url: string,
      progress: number
    ) => {
      addOrUpdateUpload?.({ key: uploadKey, progress, url });
    };

    const onUploadError = (uploadKey: string) => {
      addOrUpdateUpload?.({ key: uploadKey, status: 'error' });
    };

    const onUploadSuccess = (upload: Upload) => {
      addOrUpdateUpload?.({ key: upload.key, status: 'success' });
      onFileUploaded?.(upload);
    };
  };

  const cancelUpload = (uploadKey: string) => {
    apiCancelUpload(uploadKey);

    addOrUpdateUpload?.({ key: uploadKey, status: 'cancelled' });
  };

  return { uploadFiles, cancelUpload, uploads };
};

export default useFilesUpload;
