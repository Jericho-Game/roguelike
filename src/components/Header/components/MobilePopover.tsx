import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Popover, Transition } from '@headlessui/react';

import { XIcon } from '@heroicons/react/outline';

import Logo from '../../Logo';
import Button from '../../Button';
import Tab from '../../Tab';

type HeaderProps = {
  user: Nullable<User>;
};

export default function MobilePopover({ user }: HeaderProps) {
  return (
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
        {({ close }) => (
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <Popover.Button as={Link} to="/">
                  <Logo />
                </Popover.Button>
                <div className="-mr-2">
                  <Button as={Popover.Button} variant="icon">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-6 py-6 px-5">
              <nav className="grid gap-y-8">
                <Tab as={Link} to="/forum" className="w-full" onClick={() => close()}>Forum</Tab>
                <Tab as={Link} to="/leaderboard" className="w-full" onClick={() => close()}>Leaderboard</Tab>
                {user && <Tab as={Link} to="/profile" className="w-full" onClick={() => close()}>Profile</Tab>}
              </nav>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div>
                <Button
                  as={Link}
                  to={!user ? '/signup' : '/signout'}
                  className="w-full"
                  variant="secondary"
                >
                  {!user ? 'Sign Up' : 'Sign Out'}
                </Button>
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
        )}
      </Popover.Panel>
    </Transition>
  );
}
