import { AxiosInstance } from 'axios';
import config from '../utils/config';
import {
  RegistrationSettings,
  User,
  Directory,
  FetchFilesCriteria,
  UserFile,
  PlatformSettings,
  CreateDirectoryRequest
} from '@sherapp/sher-shared';

interface SignInRequest {
  emailAddress: string;
  password: string;
}

interface SignUpRequest extends SignInRequest {
  userId: string;
  invitationCode?: string;
}

class ApiClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  signIn(request: SignInRequest) {
    return this.axiosInstance.post(config.api.endpoints.token.new, request);
  }

  refreshToken() {
    return this.axiosInstance.post(config.api.endpoints.token.root, {});
  }

  signOut() {
    return this.axiosInstance.delete(config.api.endpoints.token.root);
  }

  signUp(request: SignUpRequest) {
    return this.axiosInstance.post(config.api.endpoints.user, request);
  }

  async getUser(): Promise<User> {
    const response = await this.axiosInstance.get(config.api.endpoints.user);
    return response?.data ?? null;
  }

  async getRegistrationSettings(): Promise<RegistrationSettings> {
    const { data } = await this.axiosInstance.get(
      config.api.endpoints.platform.registrationSettings
    );
    return data;
  }

  async fetchUserUploadedFiles(
    criteria?: FetchFilesCriteria
  ): Promise<UserFile[]> {
    const { data } = await this.axiosInstance.get(config.api.endpoints.file(), {
      params: criteria
    });
    return data;
  }

  async deleteFile(fileId: string) {
    await this.axiosInstance.delete(config.api.endpoints.file(fileId));
  }

  async listDirectory(directoryId?: string): Promise<Directory> {
    let url = config.api.endpoints.directory(directoryId);
    const { data } = await this.axiosInstance.get(url);
    return data;
  }

  async createDirectory(request: CreateDirectoryRequest): Promise<void> {
    await this.axiosInstance.post(config.api.endpoints.directory(), request);
  }

  async deleteDirectory(directoryId: string) {
    await this.axiosInstance.delete(
      config.api.endpoints.directory(directoryId)
    );
  }

  async getPlatformSettings(): Promise<PlatformSettings> {
    const { data } = await this.axiosInstance.get(
      config.api.endpoints.platform.settings
    );
    return await data;
  }

  updatePlatformSettings(settings: PlatformSettings) {
    return this.axiosInstance.put(
      config.api.endpoints.platform.settings,
      settings
    );
  }
}

export default ApiClient;
