import axios from 'axios';
import config from '../../utils/config';

type ProgressCallback = (progress: number) => void;

export const uploadFile = async (
  file: File,
  fileId: string,
  accessToken: string,
  onProgress: ProgressCallback
) => {
  const formData = new FormData();
  formData.set('id', fileId);
  formData.set('file', file);
  const { data } = await axios.post(
    `${config.api.url}${config.api.endpoints.fileUpload}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      onUploadProgress: (progressEvent) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 100;
        onProgress(progress);
      }
    }
  );
  return data;
};
