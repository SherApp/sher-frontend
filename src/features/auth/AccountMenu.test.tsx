import { useOktaAuth } from '@okta/okta-react';
import AccountMenu from './AccountMenu';
import { fireEvent, render } from '@testing-library/react';

jest.mock('@okta/okta-react', () => ({
  useOktaAuth: jest.fn()
}));

it('signs out on sign out click', () => {
  const signOutFn = jest.fn();
  (useOktaAuth as jest.Mock).mockReturnValue({
    oktaAuth: {
      signOut: signOutFn
    },
    authState: {
      isAuthenticated: true
    }
  });

  const { getByLabelText, getByText } = render(<AccountMenu />);

  fireEvent.click(getByLabelText(/account menu/i));
  fireEvent.click(getByText(/sign out/i));

  expect(signOutFn).toHaveBeenCalled();
});
