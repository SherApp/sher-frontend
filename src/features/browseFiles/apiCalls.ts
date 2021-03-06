import config from '../../utils/config';
import apiClient from '../../api/apiClient';

export interface UserFile {
  id: string;
  fileName: string;
  slug: string;
  length: number;
  isDeleted: boolean;
}

export const fetchUserUploadedFiles = async (): Promise<UserFile[]> => {
  const { data } = await apiClient.get(config.api.endpoints.fileUpload);
  return data;
};

export const deleteFile = async (fileId: string) => {
  await apiClient.delete(`${config.api.endpoints.fileUpload}/${fileId}`);
};
