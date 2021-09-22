import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Collapse, List, ListItem, ListItemIcon, ListItemText, Icon } from '@material-ui/core';
import _ from 'lodash';

import { DrawerItemProps } from '../../../types';
import { Logo } from '../../../assets';
import './drawer.css';

export const Drawer = () => {
  const location = useLocation();

  const archivedChildren = [{ name: 'Users', link: '/users/archived', matchLinks: ['archived'] }];

  const DrawerItem: React.FC<DrawerItemProps> = ({
    name,
    link = null,
    icon,
    subItems = [],
    matchLinks,
    ignoreLinks,
    strict = false,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const hasSubItems = !_.isEmpty(subItems);
    const includes = (_link) => _.includes(location.pathname, _link);
    const hasNoIgnores = _.filter(ignoreLinks, includes).length === 0;

    const handleClick = () => {
      setIsOpen(!isOpen);
    };

    useEffect(() => {
      if (strict && location.pathname === link) {
        setIsActive(true);
      } else {
        const subLinkMatch = _.filter(matchLinks, includes).length > 0;

        if (_.startsWith(location.pathname, link) && subLinkMatch && hasNoIgnores) {
          setIsActive(true);
        }
      }
    }, []);

    const SubItem = ({ child, activeChild }) => {
      return (
        <NavLink key={child.name} to={child.link}>
          <div className={activeChild ? 'active-drawer-item' : null}>
            <ListItem button className={activeChild ? 'active-drawer-item-spacing' : null}>
              <ListItemIcon />
              <ListItemText>{child.name}</ListItemText>
            </ListItem>
          </div>
        </NavLink>
      );
    };

    if (hasSubItems) {
      return (
        <div key={name}>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <Icon className="text-white">{icon}</Icon>
            </ListItemIcon>
            <ListItemText>{name}</ListItemText>
            {hasSubItems && (
              <Icon className="text-white">{isOpen ? 'expand_less' : 'expand_more'}</Icon>
            )}
          </ListItem>
          <Collapse in={isOpen} timeout="auto">
            <List component="div" disablePadding>
              {subItems.map((child) => {
                let activeChild: boolean;

                if (strict) {
                  activeChild = location.pathname === child.link;
                } else {
                  const subLinkMatch = _.filter(child.matchLinks, includes).length > 0;
                  const subHasNoIgnores = _.filter(ignoreLinks, includes).length === 0;

                  activeChild =
                    _.startsWith(location.pathname, child.link) &&
                    hasNoIgnores &&
                    subLinkMatch &&
                    subHasNoIgnores;
                }

                if (!isActive && activeChild) {
                  setIsActive(true);
                  setIsOpen(true);
                }

                return <SubItem child={child} activeChild={activeChild} />;
              })}
            </List>
          </Collapse>
        </div>
      );
    }

    return (
      <NavLink key={name} to={link} exact>
        <div className={isActive ? 'active-drawer-item' : null}>
          <ListItem button className={isActive ? 'active-drawer-item-spacing' : null}>
            <ListItemIcon>
              <Icon className="text-white">{icon}</Icon>
            </ListItemIcon>
            <ListItemText>{name}</ListItemText>
            {hasSubItems && (
              <Icon className="text-white">{isOpen ? 'expand_less' : 'expand_more'}</Icon>
            )}
          </ListItem>
        </div>
      </NavLink>
    );
  };

  return (
    <div className="drawer-container">
      <div className="logo-container">
        <img src={Logo} alt="logo" className="w-36" />
      </div>
      <div className="menu-container">
        <List className="w-full">
          <DrawerItem name="Dashboard" link="/" icon="home" strict />
          <DrawerItem
            name="Users"
            link="/users"
            icon="group"
            matchLinks={['users', 'new', 'edit']}
            ignoreLinks={['archived']}
          />
          <DrawerItem name="Archived" icon="archive" subItems={archivedChildren} />
        </List>
      </div>
    </div>
  );
};
