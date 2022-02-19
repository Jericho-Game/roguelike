import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type HeaderProps = {
  user?: User;
};

export default function Header({ user }: HeaderProps) {
  const { pathname } = useLocation();
  return (
    <Popover as="header" className="bg-white fixed w-full top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={classNames(
            'flex justify-between items-center',
            'border-b-2 border-gray-100 py-6',
            'md:justify-start md:space-x-10',
          )}
        >
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link
              to="/"
              className={classNames(
                'flex justify-start items-center gap-2',
                'text-secondary-normal hover:text-secondary-hover',
                'lg:w-0 lg:flex-1',
              )}
            >
              <div className="bg-secondary-normal hover:bg-secondary-hover aspect-square w-12 rounded" />
              <span className="uppercase font-bold text-xl">Roguelike</span>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button
              className={classNames(
                'bg-white text-gray-400 rounded-md p-2',
                'inline-flex items-center justify-center',
                'hover:text-gray-500 hover:bg-gray-100',
                'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-normal',
              )}
            >
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <nav className="hidden md:flex items-center space-x-10">
            <Link
              to="/forum"
              className={classNames(
                (pathname === '/forum')
                  ? 'text-gray-900 border-primary-normal'
                  : 'text-gray-500 border-transparent',
                'text-base font-medium border-b-2 py-2 hover:border-primary-hover hover:text-gray-900',
              )}
            >
              Forum
            </Link>
            <Link
              to="/leaderboard"
              className={classNames(
                (pathname === '/leaderboard')
                  ? 'text-gray-900 border-primary-normal'
                  : 'text-gray-500 border-transparent',
                'text-base font-medium border-b-2 py-2 hover:border-primary-hover hover:text-gray-900',
              )}
            >
              Leaderboard
            </Link>
            <Popover.Group as={Fragment}>
              {user ? (
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? 'text-gray-900' : 'text-gray-500',
                          'group bg-white rounded-md',
                          'inline-flex items-center',
                          'text-base font-medium hover:text-gray-900',
                          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-hover',
                        )}
                      >
                        <span>Account</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? 'text-gray-600' : 'text-gray-400',
                            'ml-2 h-5 w-5 group-hover:text-gray-500',
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel
                          className={classNames(
                            'absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0',
                          )}
                        >
                          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                              <Link to="/profile">Profile</Link>
                              <Link to="/signout">Sign Out</Link>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className={classNames(
                      (pathname === '/signin')
                        ? 'text-gray-900 border-primary-normal'
                        : 'text-gray-500 border-transparent',
                      'text-base font-medium border-b-2 py-2 hover:border-primary-hover hover:text-gray-900',
                    )}
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className={classNames(
                      'inline-flex items-center justify-center whitespace-nowrap',
                      'border border-transparent rounded-md',
                      'text-base font-medium text-white',
                      'ml-8 px-4 py-2 shadow-sm bg-secondary-normal',
                      'hover:bg-secondary-hover',
                    )}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </Popover.Group>
          </nav>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <Popover.Button
                  as={Link}
                  to="/"
                  className={classNames(
                    'flex justify-start items-center gap-2 lg:w-0 lg:flex-1',
                    'text-secondary-normal hover:text-secondary-hover',
                  )}
                >
                  <div className="bg-secondary-normal hover:bg-secondary-hover aspect-square w-12 rounded" />
                  <span className="uppercase font-bold text-xl">Roguelike</span>
                </Popover.Button>
                <div className="-mr-2">
                  <Popover.Button
                    className={classNames(
                      'inline-flex items-center justify-center',
                      'bg-white rounded-md p-2 text-gray-400',
                      'hover:text-gray-500 hover:bg-gray-100',
                      'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-hover',
                    )}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="mt-6 py-6 px-5">
              <nav className="grid gap-y-8">
                <Popover.Button
                  as={Link}
                  to="/forum"
                  className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                >
                  Forum
                </Popover.Button>
                <Popover.Button
                  as={Link}
                  to="/leaderboard"
                  className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                >
                  Leaderboard
                </Popover.Button>
                {user && (
                  <Popover.Button
                    as={Link}
                    to="/profile"
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                  >
                    Profile
                  </Popover.Button>
                )}
              </nav>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div>
                <Popover.Button
                  as={Link}
                  to={!user ? '/signup' : '/signout'}
                  className={classNames(
                    'flex items-center justify-center',
                    'w-full px-4 py-2',
                    'border border-transparent rounded-md',
                    'text-base font-medium text-white',
                    'shadow-sm bg-secondary-normal hover:bg-secondary-hover',
                  )}
                >
                  {!user ? 'Sign Up' : 'Sign Out'}
                </Popover.Button>
                {!user && (
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Already have an account?
                    {' '}
                    <Popover.Button
                      as={Link}
                      to="/signin"
                      className="text-indigo-600 hover:text-secondary-normal"
                    >
                      Sign in
                    </Popover.Button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
