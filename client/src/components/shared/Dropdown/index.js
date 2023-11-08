import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';
import { avatarIconUrl } from '../../../icons';
import { FaChevronDown } from 'react-icons/fa';
import { encryptedLocalStorage } from '../../../config/utils';

export default function AccountMenu() {
  const user = encryptedLocalStorage.getItem('user');

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const LogoutUser = () => {
    localStorage.clear();
    window.location = '/login';
  };
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}>
            <span className="flex items-center justify-center">
              <span className="w-10 h-10 rounded">
                <img
                  src={user && user.imageUrl ? user.imageUrl : avatarIconUrl}
                  alt="Profile"
                />
              </span>
              <span className="ml-1">
                <FaChevronDown className="text-xs dark:text-gray-400" />
              </span>
            </span>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <MenuItem>
          <div className="flex items-center">
            <Avatar style={{ height: 50, width: 50 }} />
            <div className="flex flex-col">
              <span
                className="ml-2 text-sm"
                style={{ textTransform: 'capitalize' }}>
                {user?.firstName.toLowerCase() +
                  ' ' +
                  user?.lastName.toLowerCase()}
              </span>
              <span className="ml-2 text-sm">{user?.email.toLowerCase()}</span>
            </div>
          </div>
        </MenuItem>

        <Divider />
        <MenuItem>
          <NavLink
            to="/settings"
            className="w-full flex items-center text-gray-800 hover:text-gray-800 no-underline">
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </NavLink>
        </MenuItem>
        <MenuItem>
          <div onClick={LogoutUser} className="w-full flex items-center">
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </div>
        </MenuItem>
      </Menu>
    </>
  );
}
