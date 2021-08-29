import csrAxiosInstance from './csrAxiosInstance';
import ApiClient from './apiClient';

export const useApiClient = () => {
  return new ApiClient(csrAxiosInstance);
};
