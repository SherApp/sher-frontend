import axios from 'axios';
import config from '../../utils/config';

export interface UserFile {
  id: string;
  originalFileName: string;
  slug: string;
  length: number;
}

export const fetchUserUploadedFiles = async (
  accessToken: string
): Promise<UserFile[]> => {
  const { data } = await axios.get(
    `${config.api.url}${config.api.endpoints.fileUpload}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
  return data;
};
