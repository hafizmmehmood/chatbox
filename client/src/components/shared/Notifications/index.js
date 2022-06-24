import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import { FaRegBell } from 'react-icons/fa';
import { tabsList } from './helper';
import { DataNotFound } from '../../../utils/DataNotFound';

const ListItemComponent = (props) => {
  const { select, click, name, id } = props;
  return (
    <>
      <ListItem
        button
        id={id}
        key={id}
        className="p-2 pb-1 pt-3 m-auto text-xs rounded-0 w-fit"
        selected={select}
        onClick={click}>
        <span className="font-semibold text-xs text-capitalize">{name}</span>
        <div className="divider" />
      </ListItem>
    </>
  );
};

const Notifications = (props) => {
  const [activeTab, setActiveTab] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="vertical-divider-small" />
      <div className='p-2'>
        <Badge
          color="primary"
          className="notification-badge cursor-pointer"
          badgeContent={6}
          onClick={handleClick}>
          <FaRegBell className='text-xl' />
        </Badge>
      </div>

      <div className="vertical-divider-small" />

      <Menu
        id="drop-down-user-menu"
        className="notification-card-cont"
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        open={Boolean(anchorEl)}
        classes={{
          list: 'p-0 z-index-99999'
        }}
        onClose={handleClose}>
        <div className="dropdown-menu-xl overflow-hidden">
          <div className="card-header flex align-center justify-between card-header-alt p-0">
            <List
              component="div"
              className="w-full nav-line justify-between py-2 px-4 sm:py-0 sm:flex nav-alt tabs-primary">
              {tabsList.map((tab) => {
                return (
                  <div key={tab.id + tab.name}>
                    <ListItemComponent
                      select={activeTab === tab.tab}
                      click={() => {
                        toggle(tab.tab);
                      }}
                      id={tab.id}
                      name={tab.name}
                    />
                  </div>
                );
              })}
            </List>
          </div>
          <div className="p-2">
            <DataNotFound />
          </div>
        </div>
      </Menu>
    </>
  );
};
export default Notifications;
