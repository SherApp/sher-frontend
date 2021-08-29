import {
  CreateDirectoryRequest,
  FetchFilesCriteria
} from '@sherapp/sher-shared';
import ApiClient from './apiClient';
import { AxiosInstance } from 'axios';
import config from '../utils/config';

const endpoints = config.api.endpoints;

const getAxiosMock = () =>
  (({
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
    put: jest.fn()
  } as unknown) as AxiosInstance);

it('sends correct delete directory request', async () => {
  const axiosInstance = getAxiosMock();
  const apiClient = new ApiClient(axiosInstance);

  const dirId = '123';
  await apiClient.deleteDirectory(dirId);

  expect(axiosInstance.delete).toHaveBeenCalledWith(endpoints.directory(dirId));
});

it('sends correct create directory request', async () => {
  const axiosInstance = getAxiosMock();
  const apiClient = new ApiClient(axiosInstance);

  const request: CreateDirectoryRequest = {
    name: '123',
    parentDirectoryId: '321',
    id: '555'
  };

  await apiClient.createDirectory(request);

  expect(axiosInstance.post).toHaveBeenCalledWith(
    endpoints.directory(),
    request
  );
});

it('sends correct list directory request', async () => {
  const axiosInstance = getAxiosMock();
  const apiClient = new ApiClient(axiosInstance);

  const dirId = '123';

  (axiosInstance.get as jest.Mock).mockResolvedValueOnce({ data: [] });

  await apiClient.listDirectory(dirId);

  expect(axiosInstance.get).toHaveBeenCalledWith(endpoints.directory(dirId));
});

it('sends correct fetch user uploaded files request', async () => {
  const axiosInstance = getAxiosMock();
  const apiClient = new ApiClient(axiosInstance);

  const criteria: FetchFilesCriteria = {
    requiredFileNamePart: '123'
  };

  (axiosInstance.get as jest.Mock).mockResolvedValueOnce({ data: [] });

  await apiClient.fetchUserUploadedFiles(criteria);

  expect(axiosInstance.get).toHaveBeenCalledWith(endpoints.file(), {
    params: { requiredFileNamePart: criteria.requiredFileNamePart }
  });
});

it('sends correct delete file request', async () => {
  const axiosInstance = getAxiosMock();
  const apiClient = new ApiClient(axiosInstance);

  const fileId = '123';
  await apiClient.deleteFile(fileId);

  expect(axiosInstance.delete).toHaveBeenCalledWith(endpoints.file(fileId));
});
