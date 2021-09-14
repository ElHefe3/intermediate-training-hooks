import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons';

import './nav.css';
import { useSelector } from 'react-redux';
import { userAuthService } from '../../../services';
import { NavIconButtonProps } from '../../../types';
import { userSelector } from '../../../reducers';

export const Nav: React.FC = ({ children }) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { user } = useSelector(userSelector);
  const notifications = 0;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    return userAuthService.logout().then(() => {
      history.push('/');
    });
  };

  const NavIconButton: React.FC<NavIconButtonProps> = ({ icon, count }) => {
    return (
      <IconButton className="mx-1">
        <Badge badgeContent={count} color="secondary">
          <Icon className="nav-icon-color">{icon}</Icon>
        </Badge>
      </IconButton>
    );
  };

  const DropDownMenu = () => (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      className="mt-10"
    >
      <MenuItem>
        <Link to="/profile" role="menuitem">
          Your Profile
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="/settings" role="menuitem">
          Settings
        </Link>
      </MenuItem>
      <MenuItem onClick={signOut}>Sign out</MenuItem>
    </Menu>
  );

  return (
    <div className="nav-container">
      <div className="nav-bar-container">
        <NavIconButton icon="notifications" count={notifications} />
        <Divider orientation="vertical" flexItem light />
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          className="mx-1"
        >
          <div className="flex mx-1">
            <Typography>{user.email}</Typography>
            <KeyboardArrowDown className="mx-1" />
          </div>
        </Button>
        <Avatar src={`https://robohash.org/${user.email}?bgset=bg1`} alt="Logo" />
      </div>
      <DropDownMenu />
      <div className="border-t-2 overflow-y-auto">{children}</div>
    </div>
  );
};
