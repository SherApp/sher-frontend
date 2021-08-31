import { useRef } from 'react';
import { Menu, MenuItem, useMenuVisibility } from '../../components/Menu';
import { routes } from '../../utils/config';
import { useQuery } from 'react-query';
import { useApiClient } from '../../api/useApiClient';
import { useRouter } from 'next/router';
import { User } from 'react-feather';
import Link from 'next/link';

interface AccountMenuProps {
  className?: string;
}

const AccountMenu = ({ className }: AccountMenuProps) => {
  const router = useRouter();

  const apiClient = useApiClient();
  const { data: user } = useQuery('user', apiClient.getUser);

  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const { isVisible } = useMenuVisibility(menuToggleRef);

  const handleSignOutClick = async () => {
    await apiClient.signOut();
    await router.push(routes.auth('signIn'));
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
        <User />
      </button>
      <Menu
        open={isVisible}
        aria-labelledby="account-menu-button"
        id="account-menu"
      >
        {user.roles.includes('Admin') && (
          <Link href={routes.admin}>
            <MenuItem>Admin area</MenuItem>
          </Link>
        )}
        <MenuItem onClick={handleSignOutClick}>Sign out</MenuItem>
      </Menu>
    </div>
  );
};

export default AccountMenu;
