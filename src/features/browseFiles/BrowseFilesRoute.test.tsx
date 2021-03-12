import { fetchUserUploadedFiles } from './apiCalls';
import { act, fireEvent, render } from '@testing-library/react';
import BrowseFilesRoute from './BrowseFilesRoute';

jest.mock('./apiCalls', () => ({
  fetchUserUploadedFiles: jest.fn()
}));

it('fetches files on mount', async () => {
  (fetchUserUploadedFiles as jest.Mock).mockResolvedValueOnce([]);

  await act(async () => {
    await render(<BrowseFilesRoute />);
  });

  expect(fetchUserUploadedFiles).toHaveBeenCalled();
});

it('fetches files with search string', async () => {
  const searchString = 'abc';
  (fetchUserUploadedFiles as jest.Mock).mockResolvedValue([]);

  await act(async () => {
    const { getByLabelText } = await render(<BrowseFilesRoute />);

    fireEvent.change(getByLabelText(/search/i), {
      target: { value: searchString }
    });
  });

  expect(fetchUserUploadedFiles).toHaveBeenCalledWith({
    requiredFileNamePart: searchString
  });
});
