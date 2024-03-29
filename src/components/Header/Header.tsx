import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import classnames from 'classnames';

import { Popover, Transition } from '@headlessui/react';

import { MenuIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';

import Tab from '../Tab';
import Logo from '../Logo';
import Avatar from '../Avatar';
import Button from '../Button';
import MobilePopover from './components/MobilePopover';

import { signOut } from '../../store/user';
import type { UserState } from '../../store/user';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { data: user } = useSelector((state: { user: UserState }) => state.user);

  return (
    <Popover as="header" className="bg-white w-full top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/"><Logo /></Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Button as={Popover.Button} variant="icon">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
          <nav className="hidden md:flex items-center space-x-10">
            <Tab
              as={Link}
              to="/forum"
              className="py-4"
              variant="primary"
              active={pathname.includes('/forum')}
            >
              Forum
            </Tab>
            <Tab
              as={Link}
              className="py-4"
              variant="primary"
              to="/leaderboard"
              active={pathname.includes('/leaderboard')}
            >
              Leaderboard
            </Tab>
            {user ? (
              <Popover className="relative">
                {({ open, close }) => (
                  <>
                    <Tab
                      as={Popover.Button}
                      variant="primary"
                      className="flex items-center py-2"
                      active={open || pathname === '/profile'}
                    >
                      <Avatar
                        src={user.avatar}
                        firstName={user.first_name}
                        secondName={user.second_name}
                        className="flex-shrink-0 h-10 w-10 mr-2"
                      />
                      <span>{user.display_name}</span>
                      <ChevronDownIcon
                        className={classnames('ml-2 h-5 w-5', {
                          'text-gray-600': open,
                          'text-gray-400': !open,
                        })}
                        aria-hidden="true"
                      />
                    </Tab>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 right-0 w-full max-w-sm sm:px-0">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid gap-6 bg-white px-5 py-6">
                            <Tab
                              as={Link}
                              variant="primary"
                              to="/profile"
                              className="w-full"
                              active={pathname === '/profile'}
                              onClick={() => close()}
                            >
                              Profile
                            </Tab>
                            <Tab
                              as={Link}
                              variant="primary"
                              to="/signin"
                              className="w-full"
                              onClick={() => {
                                dispatch(signOut());
                                close();
                                navigate('/');
                              }}
                            >
                              Sign Out
                            </Tab>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            ) : (
              <span>
                <Button variant="alternate" as={Link} to="/signin">Sign In</Button>
                <Button variant="secondary" className="ml-4" as={Link} to="/signup">Sign Up</Button>
              </span>
            )}
          </nav>
        </div>
      </div>
      <MobilePopover user={user} />
    </Popover>
  );
}
