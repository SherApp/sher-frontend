import { fireEvent, render } from '@testing-library/react';
import UploadCircle from './UploadCircle';

it('changes text on drag enter', () => {
  const { getByText, getByRole } = render(<UploadCircle />);

  expect(getByText('Drag your files here')).toBeInTheDocument();

  const uploadButton = getByRole('button');
  fireEvent.dragEnter(uploadButton);

  expect(getByText('Drop to begin uploading')).toBeInTheDocument();
});

it('calls passed callback on drop', () => {
  const droppedFiles = [null];
  const callback = jest.fn();
  const { getByRole } = render(<UploadCircle onFilesSelected={callback} />);

  const uploadButton = getByRole('button');
  fireEvent.drop(uploadButton, {
    dataTransfer: {
      items: { length: droppedFiles.length },
      files: droppedFiles
    }
  });

  expect(callback).toHaveBeenCalledWith(droppedFiles);
});

it('calls passed callback on file change', () => {
  const files = [null];
  const callback = jest.fn();
  const { getByLabelText } = render(
    <UploadCircle onFilesSelected={callback} />
  );

  const uploadInput = getByLabelText(/click to select a file/i);
  fireEvent.change(uploadInput, { target: { files } });

  expect(callback).toHaveBeenCalledWith(files);
});
