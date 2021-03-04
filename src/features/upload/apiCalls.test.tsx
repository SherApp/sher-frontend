import { v4 as uuidv4 } from 'uuid';
import { uploadFile } from './apiCalls';
import config from '../../utils/config';
import apiClient from '../../api/apiClient';

jest.mock('../../api/apiClient', () => ({
  post: jest.fn()
}));

it('posts file with id to api and applies auth header', async () => {
  const file = new File([''], 'file.png', { type: 'image/png' });
  const id = uuidv4();

  const postMock = apiClient.post as jest.Mock;

  postMock.mockResolvedValueOnce({ data: {} });

  await uploadFile(file, id);

  const [url, data] = postMock.mock.calls[0];

  expect(url).toBe(config.api.endpoints.fileUpload);
  expect(data.get('file')).toBe(file);
  expect(data.get('id')).toBe(id);
});
