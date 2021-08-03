import apiClient from '../../api/apiClient';
import {
  createDirectory,
  CreateDirectoryRequest,
  deleteDirectory,
  deleteFile,
  fetchUserUploadedFiles,
  listDirectory
} from './apiCalls';
import { FetchFilesCriteria } from '@sherapp/sher-shared';
import config from '../../utils/config';

const endpoints = config.api.endpoints;

jest.mock('../../api/apiClient', () => ({
  delete: jest.fn(),
  post: jest.fn(),
  get: jest.fn()
}));

it('sends correct delete directory request', async () => {
  const dirId = '123';
  await deleteDirectory(dirId);

  expect(apiClient.delete).toHaveBeenCalledWith(endpoints.directory(dirId));
});

it('sends correct create directory request', async () => {
  const request: CreateDirectoryRequest = {
    name: '123',
    parentDirectoryId: '321',
    id: '555'
  };

  await createDirectory(request);

  expect(apiClient.post).toHaveBeenCalledWith(endpoints.directory(), request);
});

it('sends correct list directory request', async () => {
  const dirId = '123';

  (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: [] });

  await listDirectory(dirId);

  expect(apiClient.get).toHaveBeenCalledWith(endpoints.directory(dirId));
});

it('sends correct fetch user uploaded files request', async () => {
  const criteria: FetchFilesCriteria = {
    requiredFileNamePart: '123'
  };

  (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: [] });

  await fetchUserUploadedFiles(criteria);

  expect(apiClient.get).toHaveBeenCalledWith(endpoints.file(), {
    params: { requiredFileNamePart: criteria.requiredFileNamePart }
  });
});

it('sends correct delete file request', async () => {
  const fileId = '123';
  await deleteFile(fileId);

  expect(apiClient.delete).toHaveBeenCalledWith(endpoints.file(fileId));
});
