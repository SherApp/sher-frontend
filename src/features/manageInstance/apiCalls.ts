import apiClient from '../../api/apiClient';
import config from '../../utils/config';
import { PlatformSettings } from './types';

export const getPlatformSettings = async (): Promise<PlatformSettings> => {
  const { data } = await apiClient.get(config.api.endpoints.platform.settings);
  return await data;
};

export const updatePlatformSettings = (settings: PlatformSettings) => {
  return apiClient.put(config.api.endpoints.platform.settings, settings);
};
