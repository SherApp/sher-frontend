import userIcon from '../../img/user.svg';
import { useOktaAuth } from '@okta/okta-react';
import { useRef } from 'react';
import { Menu, MenuItem, useMenuVisibility } from '../../components/Menu';

interface AccountMenuProps {
  className?: string;
}

const AccountMenu = ({ className }: AccountMenuProps) => {
  const { oktaAuth, authState } = useOktaAuth();

  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const { isVisible } = useMenuVisibility(menuToggleRef);

  const handleSignOutClick = async () => {
    await oktaAuth.signOut();
  };

  if (!authState.isAuthenticated) {
    return null;
  }

  return (
    <div className={className}>
      <button
        ref={menuToggleRef}
        id="account-menu-button"
        aria-expanded={isVisible}
        aria-controls="account-menu"
        aria-label="account menu"
      >
        <img className="w-12" src={userIcon} alt="" />
      </button>
      <Menu
        open={isVisible}
        aria-labelledby="account-menu-button"
        id="account-menu"
      >
        <MenuItem onClick={handleSignOutClick}>Sign out</MenuItem>
      </Menu>
    </div>
  );
};

export default AccountMenu;