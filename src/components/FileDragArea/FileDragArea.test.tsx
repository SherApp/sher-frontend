import { fireEvent, render } from '@testing-library/react';
import { FileDragAreaContextProvider } from './FileDragAreaContext';
import FileDragAreaInfo from './FileDragAreaInfo';
import FileDragArea from './FileDragArea';

it('shows drag info and passes correct drag state', () => {
  const filesSelectedHandlerFn = jest.fn();
  const { getByText, queryByText } = render(
    <FileDragAreaContextProvider>
      <FileDragAreaInfo />
      <FileDragArea onFilesSelected={filesSelectedHandlerFn}>
        {(dragIn) => (
          <div>
            <p>drag area</p>
            <p>{dragIn ? 'in' : 'out'}</p>
          </div>
        )}
      </FileDragArea>
    </FileDragAreaContextProvider>
  );

  const dropInfoText = 'Drop to begin uploading';

  expect(queryByText(dropInfoText)).not.toBeInTheDocument();
  expect(getByText('out')).toBeInTheDocument();

  const dragTarget = getByText(/drag area/i);
  fireEvent.dragEnter(dragTarget);

  expect(getByText('in')).toBeInTheDocument();
  expect(getByText('Drop to begin uploading')).toBeInTheDocument();

  const droppedFiles = [null];
  fireEvent.drop(dragTarget, {
    dataTransfer: {
      items: { length: droppedFiles.length },
      files: droppedFiles
    }
  });

  expect(filesSelectedHandlerFn).toHaveBeenCalledWith(droppedFiles);
});
