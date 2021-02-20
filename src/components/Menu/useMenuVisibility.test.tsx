import { fireEvent, render } from '@testing-library/react';
import { useRef } from 'react';
import useMenuVisibility from './useMenuVisibility';

const TestComponent = () => {
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { isVisible } = useMenuVisibility(toggleRef);

  return (
    <div>
      <button ref={toggleRef}>Toggle</button>
      {isVisible && (
        <ul>
          <li>menu item</li>
        </ul>
      )}
    </div>
  );
};

it('toggles menu', () => {
  const { queryByText, getByText } = render(<TestComponent />);

  expect(queryByText(/menu item/i)).not.toBeInTheDocument();

  fireEvent.click(getByText(/toggle/i));
  expect(getByText(/menu item/i)).toBeInTheDocument();
});

it('hides menu on click outside toggle', () => {
  const { getByText, queryByText } = render(<TestComponent />);

  fireEvent.click(getByText(/toggle/i));
  expect(getByText(/menu item/i)).toBeInTheDocument();

  fireEvent.click(getByText(/menu item/i));
  expect(queryByText(/menu item/i)).not.toBeInTheDocument();
});
