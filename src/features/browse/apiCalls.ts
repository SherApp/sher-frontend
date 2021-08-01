import config from '../../utils/config';
import apiClient from '../../api/apiClient';
import { FetchFilesCriteria, UserFile } from '@sherapp/sher-shared';

export interface Directory {
  id: string;
  parentDirectoryId?: string;
  name: string;
  files: UserFile[];
  directories: Directory[];
  isDeleted?: boolean;
}

export interface CreateDirectoryRequest {
  id: string;
  name: string;
  parentDirectoryId?: string;
}

export const fetchUserUploadedFiles = async (
  criteria?: FetchFilesCriteria
): Promise<UserFile[]> => {
  const { data } = await apiClient.get(config.api.endpoints.file(), {
    params: criteria
  });
  return data;
};

export const deleteFile = async (fileId: string) => {
  await apiClient.delete(config.api.endpoints.file(fileId));
};

export const listDirectory = async (
  directoryId?: string
): Promise<Directory> => {
  let url = config.api.endpoints.directory(directoryId);
  const { data } = await apiClient.get(url);
  return data;
};

export const createDirectory = async (
  request: CreateDirectoryRequest
): Promise<void> => {
  await apiClient.post(config.api.endpoints.directory(), request);
};

export const deleteDirectory = async (directoryId: string) => {
  await apiClient.delete(`${config.api.endpoints.directory}/${directoryId}`);
};
