import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';

import { ChildrenProps } from '@project/types';
import { useCurrentUserQuery } from '@project/queries';
import { userAuthService } from '@project/services';

export const Nav = ({ children }: ChildrenProps) => {
  const navigate = useNavigate();

  const { data } = useCurrentUserQuery();

  const signOut = () => {
    return userAuthService.logout().then(() => {
      navigate('/');
    });
  };

  const DropdownMenu = () => (
    <div className="flex min-h-[64px] items-center justify-end px-3">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {data?.email ?? 'Placeholder'}
            <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={signOut}
                  >
                    Sign Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );

  return (
    <div className="flex h-screen w-screen flex-col">
      <DropdownMenu />
      <div className="overflow-y-auto border-t-2">{children}</div>
    </div>
  );
};
