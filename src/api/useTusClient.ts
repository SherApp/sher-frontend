import { UploadOptions } from 'tus-js-client';
import * as tus from 'tus-js-client';
import { useApiClient } from './useApiClient';
import config from '../utils/config';

const uploads: { [key: string]: tus.Upload } = {};

interface FileUploadOptions
  extends Pick<UploadOptions, 'onError' | 'onSuccess'> {
  onProgress(url: string, bytesSent: number, bytesTotal: number): void;
}

export const useTusClient = () => {
  const apiClient = useApiClient();

  const cancelUpload = async (uploadKey: string) => {
    await uploads[uploadKey].abort(true);
  };

  const uploadFile = async (
    key: string,
    file: any,
    fileName: string,
    parentDirectoryId?: string,
    options?: FileUploadOptions
  ) => {
    let shouldRefreshToken = false;

    const metadata = {
      fileName,
      ...(parentDirectoryId ? { parentDirectoryId } : {})
    };

    const upload = new tus.Upload(file, {
      endpoint: `${config.api.baseUrl}${config.api.endpoints.file()}`,
      metadata,
      onBeforeRequest: async (req) => {
        const xhr: XMLHttpRequest = req.getUnderlyingObject();
        xhr.withCredentials = true;
        if (shouldRefreshToken) {
          await apiClient.refreshToken();
        }
      },
      onShouldRetry: (err: any) => {
        const statusCode = err.originalResponse?.getStatus() ?? 0;

        if (statusCode === 401) {
          shouldRefreshToken = true;
          return true;
        }

        return false;
      },
      ...options,
      onProgress: (bytesSent, bytesTotal) => {
        options?.onProgress?.(upload.url!, bytesSent, bytesTotal);
      }
    });

    uploads[key] = upload;

    upload.start();
  };

  return { uploadFile, cancelUpload };
};
