import config from '../../utils/config';
import apiClient from '../../api/apiClient';

export interface UserFile {
  id: string;
  fileName: string;
  slug: string;
  length: number;
  isDeleted: boolean;
}

export interface FetchFilesCriteria {
  requiredFileNamePart?: string;
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
