import useDirectory from './useDirectory';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { QueryClient, QueryClientProvider } from 'react-query';
// @ts-ignore
import ApiClient, { mocks } from '../../api/apiClient';

interface Props {
  directoryId?: string;
}

jest.mock('../../api/apiClient');

const TestComponent = ({ directoryId }: Props) => {
  const [directoryName, setDirectoryName] = useState('');
  const { directory, createChildDirectory } = useDirectory(directoryId);

  return (
    <div>
      <p>{directory?.name}</p>
      <ul>
        {directory?.directories.map((d) => (
          <li key={d.id}>{d.name}</li>
        ))}
      </ul>
      <label>
        <input
          value={directoryName}
          onChange={(e) => setDirectoryName(e.target.value)}
        />
        directory name
      </label>
      <button onClick={async () => await createChildDirectory(directoryName)}>
        create
      </button>
    </div>
  );
};

jest.mock('uuid', () => ({
  v4: jest.fn()
}));

it('lists directory', async () => {
  const directoryName = 'Dir';

  (mocks.listDirectory as jest.Mock).mockResolvedValueOnce({
    directories: [],
    name: directoryName
  });
  const dirId = '123';

  const queryClient = new QueryClient();

  await act(async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <TestComponent directoryId={dirId} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(getByText(directoryName)).toBeInTheDocument();
    });
  });

  expect(mocks.listDirectory).toHaveBeenCalledWith(dirId);
});

it('creates child directory', async () => {
  const dirId = '123';
  const childDirName = 'Dir';
  const childDirId = '321';

  (mocks.listDirectory as jest.Mock).mockResolvedValueOnce({
    directories: []
  });
  (uuidv4 as jest.Mock).mockReturnValue(childDirId);

  const queryClient = new QueryClient();

  const { getByLabelText, getByText } = render(
    <QueryClientProvider client={queryClient}>
      <TestComponent directoryId={dirId} />
    </QueryClientProvider>
  );

  const nameInput = getByLabelText(/directory name/i);
  fireEvent.change(nameInput, { target: { value: childDirName } });

  const createBtn = getByText(/create/i);

  await act(async () => {
    fireEvent.click(createBtn);
  });

  expect(mocks.createDirectory).toHaveBeenCalledWith({
    id: childDirId,
    parentDirectoryId: dirId,
    name: childDirName
  });
});
