import useDirectory from './useDirectory';
import { createDirectory, listDirectory } from './apiCalls';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  directoryId?: string;
}

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

jest.mock('./apiCalls', () => ({
  listDirectory: jest.fn(),
  createDirectory: jest.fn()
}));
jest.mock('uuid', () => ({
  v4: jest.fn()
}));

it('lists directory', async () => {
  const directoryName = 'Dir';
  (listDirectory as jest.Mock).mockResolvedValueOnce({
    directories: [],
    name: directoryName
  });
  const dirId = '123';

  await act(async () => {
    const { getByText } = render(<TestComponent directoryId={dirId} />);

    await waitFor(() => {
      expect(getByText(directoryName)).toBeInTheDocument();
    });
  });

  expect(listDirectory).toHaveBeenCalledWith(dirId);
});

it('creates child directory', async () => {
  const dirId = '123';
  const childDirName = 'Dir';
  const childDirId = '321';

  (listDirectory as jest.Mock).mockResolvedValueOnce({
    directories: []
  });
  (uuidv4 as jest.Mock).mockReturnValue(childDirId);

  const { getByLabelText, getByText } = render(
    <TestComponent directoryId={dirId} />
  );

  const nameInput = getByLabelText(/directory name/i);
  fireEvent.change(nameInput, { target: { value: childDirName } });

  const createBtn = getByText(/create/i);

  await act(async () => {
    fireEvent.click(createBtn);
  });

  expect(createDirectory).toHaveBeenCalledWith({
    id: childDirId,
    parentDirectoryId: dirId,
    name: childDirName
  });

  expect(getByText(childDirName)).toBeInTheDocument();
});
