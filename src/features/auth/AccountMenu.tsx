import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { routes } from '../../utils/config';
import { useQuery } from 'react-query';
import { useApiClient } from '../../api/useApiClient';
import { useRouter } from 'next/router';
import { Activity, Folder, LogOut, Settings, User } from 'react-feather';
import Link from 'next/link';
import clsx from 'clsx';

interface AccountMenuProps {
  className?: string;
}

const itemClassNames = (active: boolean) =>
  clsx('flex data-center px-2 py-2 w-full rounded-md', [
    active && 'bg-gray-100 dark:bg-gray-700'
  ]);

const AccountMenu = ({ className }: AccountMenuProps) => {
  const router = useRouter();

  const apiClient = useApiClient();
  const { data: user } = useQuery('user', () => apiClient.getUser());

  const handleSignOutClick = async () => {
    await apiClient.signOut();
    await router.push(routes.auth('signIn'));
  };

  if (!user) return null;

  return (
    <div className={className}>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="flex flex-row">
          <User className="sm:mr-2" />
          <span className="hidden sm:block">{user.emailAddress}</span>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute text-sm right-0 w-56 mt-2 origin-top-right bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <div>
                    <Link href={routes.browseFiles} passHref>
                      <a className={itemClassNames(active)}>
                        <Folder size={18} className="mr-2 text-gray-400" />
                        Files
                      </a>
                    </Link>
                  </div>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <div>
                    <Link href={routes.browseFiles} passHref>
                      <a className={itemClassNames(active)}>
                        <Settings size={18} className="mr-2 text-gray-400" />
                        Account
                      </a>
                    </Link>
                  </div>
                )}
              </Menu.Item>
              {user.roles.includes('Admin') && (
                <Menu.Item>
                  {({ active }) => (
                    <div>
                      <Link href={routes.admin} passHref>
                        <a className={itemClassNames(active)}>
                          <Activity size={18} className="mr-2 text-gray-400" />
                          Admin
                        </a>
                      </Link>
                    </div>
                  )}
                </Menu.Item>
              )}
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={clsx(
                      'text-red-500 text-left',
                      itemClassNames(active)
                    )}
                    onClick={handleSignOutClick}
                  >
                    <LogOut size={18} className="mr-2 text-red-400" />
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default AccountMenu;
