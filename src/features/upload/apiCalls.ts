import config from '../../utils/config';
import apiClient from '../../api/apiClient';
import axios, { CancelTokenSource } from 'axios';

const cancelTokenSources: { [key: string]: CancelTokenSource } = {};

type ProgressCallback = (progress: number) => void;

export const uploadFile = async (
  file: File,
  fileId: string,
  directoryId?: string,
  onProgress?: ProgressCallback
) => {
  const formData = new FormData();
  formData.set('id', fileId);
  if (directoryId) {
    formData.set('directoryId', directoryId);
  }
  formData.set('file', file);

  const cancelToken = axios.CancelToken.source();
  cancelTokenSources[fileId] = cancelToken;

  const { data } = await apiClient.post(
    config.api.endpoints.fileUpload,
    formData,
    {
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          onProgress(progress);
        }
      },
      cancelToken: cancelToken.token
    }
  );
  return data;
};

export const cancelUpload = (fileId: string) => {
  cancelTokenSources[fileId]?.cancel();
};
