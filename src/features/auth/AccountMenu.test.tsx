import AccountMenu from './AccountMenu';
import { fireEvent, render } from '@testing-library/react';
import { signOut } from './apiCalls';
import { useHistory } from 'react-router-dom';

jest.mock('./apiCalls', () => ({
  signOut: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn()
}));

it('signs out on sign out click', async () => {
  (useHistory as jest.Mock).mockReturnValue({
    push: jest.fn()
  });

  const { getByLabelText, getByText } = render(<AccountMenu />);

  fireEvent.click(getByLabelText(/account menu/i));
  await fireEvent.click(getByText(/sign out/i));

  expect(signOut).toHaveBeenCalled();
  expect(useHistory().push).toHaveBeenCalledWith('/signIn');
});
