import AccountMenu from './AccountMenu';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { routes } from '../../utils/config';
import { useRouter } from 'next/router';
// @ts-ignore
import { mocks } from '../../api/apiClient';
import { QueryClient, QueryClientProvider } from 'react-query';

jest.mock('../../api/apiClient');

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    push: jest.fn()
  });
});

it('signs out on sign out click', async () => {
  (mocks.getUser as jest.Mock).mockResolvedValue({ roles: [] });

  const queryClient = new QueryClient();

  const { getByLabelText, getByText } = render(
    <QueryClientProvider client={queryClient}>
      <AccountMenu />
    </QueryClientProvider>
  );

  await waitFor(() => {
    fireEvent.click(getByLabelText(/account menu/i));
  });
  await fireEvent.click(getByText(/sign out/i));

  expect(mocks.signOut).toHaveBeenCalled();
  expect(useRouter().push).toHaveBeenCalledWith(routes.auth('signIn'));
});

it('shows admin route for user with "Admin" role', async () => {
  (mocks.getUser as jest.Mock).mockResolvedValue({ roles: ['Admin'] });

  const queryClient = new QueryClient();

  const { getByText } = render(
    <QueryClientProvider client={queryClient}>
      <AccountMenu />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(getByText(/admin area/i)).toBeInTheDocument();
  });
});
