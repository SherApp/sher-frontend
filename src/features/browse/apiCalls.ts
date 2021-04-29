import config from '../../utils/config';
import apiClient from '../../api/apiClient';
import { FetchFilesCriteria, UserFile } from '@sherapp/sher-shared';

export interface Directory {
  id: string;
  parentDirectoryId?: string;
  name: string;
  files: UserFile[];
  directories: Directory[];
}

export const fetchUserUploadedFiles = async (
  criteria?: FetchFilesCriteria
): Promise<UserFile[]> => {
  const { data } = await apiClient.get(config.api.endpoints.fileUpload, {
    params: criteria
  });
  return data;
};

export const deleteFile = async (fileId: string) => {
  await apiClient.delete(`${config.api.endpoints.fileUpload}/${fileId}`);
};

export const listDirectory = async (
  directoryId?: string
): Promise<Directory> => {
  const { data } = await apiClient.get(config.api.endpoints.directory, {
    params: { directoryId }
  });
  return data;
};
