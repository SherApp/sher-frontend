import AccountMenu from './AccountMenu';
import { fireEvent, render } from '@testing-library/react';
import { signOut } from './apiCalls';

jest.mock('./apiCalls', () => ({
  signOut: jest.fn()
}));

it('signs out on sign out click', () => {
  const { getByLabelText, getByText } = render(<AccountMenu />);

  fireEvent.click(getByLabelText(/account menu/i));
  fireEvent.click(getByText(/sign out/i));

  expect(signOut).toHaveBeenCalled();
});
