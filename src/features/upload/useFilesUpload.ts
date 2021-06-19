import { Upload } from '@sherapp/sher-shared';
import { v4 as uuidv4 } from 'uuid';
import { uploadFile } from './apiCalls';
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
        id: uuidv4(),
        name: file.name,
        size: file.size,
        progress: 0,
        directoryId: directoryId
      };

      addOrUpdateUpload?.(upload);

      uploadFile(file, upload.id, directoryId, (progress) =>
        onUploadProgress(upload.id, progress)
      )
        .then(() => onUploadSuccess(upload))
        .catch(() => onUploadError(upload.id));
    }

    const onUploadProgress = (uploadId: string, progress: number) => {
      addOrUpdateUpload?.({ id: uploadId, progress });
    };

    const onUploadError = (uploadId: string) => {
      addOrUpdateUpload?.({ id: uploadId, error: true });
    };

    const onUploadSuccess = (upload: Upload) => {
      addOrUpdateUpload?.({ id: upload.id, success: true });
      onFileUploaded?.(upload);
    };
  };

  return { uploadFiles, uploads };
};

export default useFilesUpload;
