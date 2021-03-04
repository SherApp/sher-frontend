import config from '../../utils/config';
import apiClient from '../../api/apiClient';

type ProgressCallback = (progress: number) => void;

export const uploadFile = async (
  file: File,
  fileId: string,
  onProgress?: ProgressCallback
) => {
  const formData = new FormData();
  formData.set('id', fileId);
  formData.set('file', file);
  const { data } = await apiClient.post(
    config.api.endpoints.fileUpload,
    formData,
    {
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          onProgress(progress);
        }
      }
    }
  );
  return data;
};
