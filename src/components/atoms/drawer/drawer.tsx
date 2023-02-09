import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import {
  ArchiveIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  HomeIcon,
  UserGroupIcon,
} from '@heroicons/react/solid';
import _ from 'lodash';

import { Logo } from '@project/assets';
import { ChildLinks, DrawerItemProps } from './types';
import './drawer.css';

const archivedChildren: ChildLinks[] = [
  { name: 'Users', link: '/users/archived', matchLinks: ['archived'] },
];

export const Drawer = () => {
  const location = useLocation();

  const DrawerItem: React.FC<DrawerItemProps> = ({
    name,
    link = '/ignore',
    icon,
    subItems = [],
    matchLinks,
    ignoreLinks,
    strict = false,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [activeChild, setActiveChild] = useState('');

    const hasSubItems = !_.isEmpty(subItems);
    const includes = (_link: string) => _.includes(location.pathname, _link);
    const hasNoIgnores = _.filter(ignoreLinks, includes).length === 0;

    const handleClick = () => {
      setIsOpen(!isOpen);
    };

    useEffect(() => {
      subItems.forEach((child) => {
        let _activeChild: boolean;

        if (strict) {
          _activeChild = location.pathname === child.link;
        } else {
          const subLinkMatch = _.filter(child.matchLinks, includes).length > 0;
          const subHasNoIgnores = _.filter(ignoreLinks, includes).length === 0;

          _activeChild =
            _.startsWith(location.pathname, child.link) &&
            hasNoIgnores &&
            subLinkMatch &&
            subHasNoIgnores;
        }

        if (_activeChild) {
          setIsOpen(true);
          setActiveChild(child.name);
        }
      });

      if (strict && location.pathname === link) {
        setIsActive(true);
      } else {
        const subLinkMatch = _.filter(matchLinks, includes).length > 0;

        if (_.startsWith(location.pathname, link) && subLinkMatch && hasNoIgnores) {
          setIsActive(true);
        }
      }
    }, []);

    const SubItem = ({ child, isActiveChild }: { child: ChildLinks; isActiveChild: boolean }) => {
      return (
        <NavLink key={child.name} to={child.link}>
          <div className={isActiveChild ? 'active-drawer-item' : ''}>
            <div className={`mx-4 py-3 ${isActiveChild ? 'ml-2' : ''}`}>
              <span className="ml-10" />
              <span>{child.name}</span>
            </div>
          </div>
        </NavLink>
      );
    };

    if (hasSubItems) {
      return (
        <div key={name}>
          <div onClick={handleClick} className="mx-4 flex items-center justify-between py-3">
            <div className="flex items-center space-x-4">
              {icon}
              <span>{name}</span>
            </div>
            {hasSubItems && (
              <span>
                {isOpen ? (
                  <ChevronUpIcon className="inline h-5" />
                ) : (
                  <ChevronDownIcon className="inline h-5" />
                )}
              </span>
            )}
          </div>
          <Disclosure>
            {isOpen && (
              <Disclosure.Panel static>
                {subItems.map((child) => {
                  return (
                    <SubItem
                      key={child.name}
                      child={child}
                      isActiveChild={child.name === activeChild}
                    />
                  );
                })}
              </Disclosure.Panel>
            )}
          </Disclosure>
        </div>
      );
    }

    return (
      <NavLink key={name} to={link}>
        <div className={isActive || activeChild ? 'active-drawer-item' : ''}>
          <div
            className={`mx-4 flex items-center justify-between py-3 ${
              isActive || activeChild ? 'ml-2' : ''
            }`}
          >
            <div className="flex items-center space-x-4">
              {icon}
              <span>{name}</span>
            </div>
            {hasSubItems && <p>{isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</p>}
          </div>
        </div>
      </NavLink>
    );
  };

  return (
    <div className="h-screen w-64 bg-drawer">
      <div className="flex h-16 items-center justify-center bg-white">
        <img src={Logo} alt="logo" className="w-36" />
      </div>
      <div className="flex text-white">
        <div className="w-full">
          <DrawerItem
            name="Dashboard"
            link="/"
            icon={<HomeIcon className="inline h-6" />}
            matchLinks={['modal']}
            strict
          />
          <DrawerItem
            name="Users"
            link="/users"
            icon={<UserGroupIcon className="inline h-6" />}
            matchLinks={['users', 'new', 'edit']}
            ignoreLinks={['archived']}
          />
          <DrawerItem
            name="Archived"
            icon={<ArchiveIcon className="inline h-6" />}
            subItems={archivedChildren}
          />
        </div>
      </div>
    </div>
  );
};
