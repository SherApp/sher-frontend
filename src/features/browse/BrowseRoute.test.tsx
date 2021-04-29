import { fetchUserUploadedFiles, listDirectory } from './apiCalls';
import { act, fireEvent, render } from '@testing-library/react';
import BrowseRoute from './BrowseRoute';
import { useLocation } from 'react-router-dom';

jest.mock('./apiCalls', () => ({
  listDirectory: jest.fn(),
  fetchUserUploadedFiles: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn()
}));

beforeEach(() => {
  (useLocation as jest.Mock).mockReturnValue({
    location: {
      search: ''
    }
  });
  (listDirectory as jest.Mock).mockResolvedValueOnce({});
});

it('lists root directory on mount', async () => {
  await act(async () => {
    await render(<BrowseRoute />);
  });

  expect(listDirectory).toHaveBeenCalled();
});

it('fetches files with search string', async () => {
  const searchString = 'abc';
  (fetchUserUploadedFiles as jest.Mock).mockResolvedValue([]);

  await act(async () => {
    const { getByLabelText } = await render(<BrowseRoute />);

    fireEvent.change(getByLabelText(/search/i), {
      target: { value: searchString }
    });
  });

  expect(fetchUserUploadedFiles).toHaveBeenCalledWith({
    requiredFileNamePart: searchString
  });
});
