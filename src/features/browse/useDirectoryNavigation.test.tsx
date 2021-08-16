import useDirectoryNavigation from './useDirectoryNavigation';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { Location, History } from 'history';

const TestComponent = () => {
  const { navigateTo } = useDirectoryNavigation();

  const handleGoToDirClick = (index: number) => {
    const str = index + '';
    navigateTo({ id: str, name: str });
  };

  return (
    <>
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <button
            key={i}
            onClick={() => handleGoToDirClick(i)}
          >{`go to dir ${i}`}</button>
        ))}
    </>
  );
};

it('stores correct path in state', () => {
  let testHistory: History, testLocation: Location;

  const { getByText } = render(
    <MemoryRouter>
      <TestComponent />
      <Route
        path="*"
        render={({ history, location }) => {
          testHistory = history;
          testLocation = location;
          return null;
        }}
      />
    </MemoryRouter>
  );

  const dir0Btn = getByText('go to dir 0');
  const dir3Btn = getByText('go to dir 3');

  fireEvent.click(dir0Btn);
  fireEvent.click(dir3Btn);

  expect(testLocation!.state).toMatchObject({
    segments: [
      { name: '0', id: '0' },
      { name: '3', id: '3' }
    ]
  });

  testHistory!.goBack();

  expect(testLocation!.state).toMatchObject({
    segments: [{ name: '0', id: '0' }]
  });

  testHistory!.goForward();

  expect(testLocation!.state).toMatchObject({
    segments: [
      { name: '0', id: '0' },
      { name: '3', id: '3' }
    ]
  });
});
