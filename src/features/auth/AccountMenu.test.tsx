import AccountMenu from './AccountMenu';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { getUser, signOut } from './apiCalls';
import { useHistory } from 'react-router-dom';

jest.mock('./apiCalls', () => ({
  signOut: jest.fn(),
  getUser: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn()
}));

beforeEach(() => {
  (useHistory as jest.Mock).mockReturnValue({
    push: jest.fn()
  });
});

it('signs out on sign out click', async () => {
  (getUser as jest.Mock).mockResolvedValue({ roles: [] });

  const { getByLabelText, getByText } = render(<AccountMenu />);

  await waitFor(() => {
    fireEvent.click(getByLabelText(/account menu/i));
  });
  await fireEvent.click(getByText(/sign out/i));

  expect(signOut).toHaveBeenCalled();
  expect(useHistory().push).toHaveBeenCalledWith('/signIn');
});

it('shows admin route for user with "Admin" role', async () => {
  (getUser as jest.Mock).mockResolvedValue({ roles: ['Admin'] });

  const { getByText } = render(<AccountMenu />);

  await waitFor(() => {
    expect(getByText(/admin area/i)).toBeInTheDocument();
  });
});
