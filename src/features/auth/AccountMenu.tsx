import userIcon from '../../img/user.svg';
import { useRef } from 'react';
import { Menu, MenuItem, useMenuVisibility } from '../../components/Menu';
import { useHistory } from 'react-router-dom';
import { signOut } from './apiCalls';
import { useUser } from './useUser';

interface AccountMenuProps {
  className?: string;
}

const AccountMenu = ({ className }: AccountMenuProps) => {
  const history = useHistory();
  const { user } = useUser();

  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const { isVisible } = useMenuVisibility(menuToggleRef);

  const handleMyFilesClick = () => {
    history.push('/browse');
  };

  const handleSignOutClick = async () => {
    await signOut();
    history.push('/signIn');
  };

  if (!user) return null;

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
        <MenuItem onClick={handleMyFilesClick}>My files</MenuItem>
        {user.roles.includes('Admin') && <MenuItem>Admin area</MenuItem>}
        <MenuItem onClick={handleSignOutClick}>Sign out</MenuItem>
      </Menu>
    </div>
  );
};

export default AccountMenu;
