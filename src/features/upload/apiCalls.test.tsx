import { v4 as uuidv4 } from 'uuid';
import { uploadFile } from './apiCalls';
import axios from 'axios';
import config from '../../utils/config';

jest.mock('axios', () => ({
  post: jest.fn()
}));

it('posts file with id to api and applies auth header', async () => {
  const file = new File([''], 'file.png', { type: 'image/png' });
  const id = uuidv4();
  const accessToken = '123456789';

  const postMock = axios.post as jest.Mock;

  postMock.mockResolvedValueOnce({ data: {} });

  await uploadFile(file, id, accessToken);

  const [url, data, cfg] = postMock.mock.calls[0];

  expect(url).toBe(`${config.api.url}${config.api.endpoints.fileUpload}`);
  expect(data.get('file')).toBe(file);
  expect(data.get('id')).toBe(id);
  expect(cfg.headers).toStrictEqual({
    Authorization: `Bearer ${accessToken}`
  });
});
