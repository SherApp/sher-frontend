import { act, fireEvent, render } from '@testing-library/react';
import BrowseRoute from './BrowseRoute';
import { useRouter } from 'next/router';
import useDirectory from './useDirectory';
// @ts-ignore
import { mocks } from '../../api/apiClient';

jest.mock('../../api/apiClient');

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

jest.mock('./useDirectory', () => jest.fn());

beforeEach(() => {
  (mocks.listDirectory as jest.Mock).mockResolvedValueOnce({});
  (useRouter as jest.Mock).mockResolvedValue({});
  (useDirectory as jest.Mock).mockReturnValue({
    directory: {}
  });
});

it('fetches files with search string', async () => {
  const searchString = 'abc';
  (mocks.fetchUserUploadedFiles as jest.Mock).mockResolvedValue([]);

  await act(async () => {
    const { getByLabelText } = await render(<BrowseRoute />);

    fireEvent.change(getByLabelText(/search/i), {
      target: { value: searchString }
    });
  });

  expect(mocks.fetchUserUploadedFiles).toHaveBeenCalledWith({
    requiredFileNamePart: searchString
  });
});
