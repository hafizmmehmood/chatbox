import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import * as Icons from '../../../icons';
import SidebarMenu from './SidebarMenu';
import SidebarHeader from './SidebarHeader';

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

function SidebarContent({ toggleSideBar, HandleToggleSideBar }) {
  return (
    <div className="flex flex-col h-full w-full text-gray-500 dark:text-gray-400 relative">
      <div className="sidebar-header flex p-4 overflow-hidden">
        <SidebarHeader />
        <div className="absolute -right-4 z-50 ${toggleSideBar toggle-sidebar-btn">
          <Tooltip
            title={toggleSideBar ? 'Collapse sidebar' : 'Expand sidebar'}
            className="z-100"
            placement="right"
            arrow>
            <span
              className="block border bg-white  border-black p-3 rounded-full cursor-pointer"
              onClick={HandleToggleSideBar}>
              {toggleSideBar ? (
                <FaArrowRight className="text-black text-sm " />
              ) : (
                <FaArrowLeft className="text-black text-sm " />
              )}
            </span>
          </Tooltip>
        </div>
      </div>

      <div className="sidebar-navigation-cont h-full overflow-y-auto overflow-x-visible">
        <SidebarMenu />
      </div>

      <div className="sidebar-navigation sidebar-navigation-bottom  px-4 py-2 ">
        <ul>
          <li className="relative">
            <a
              target="_blank"
              href={process.env.REACT_APP_DOCS_URL}
              className={
                'cursor-pointer duration-150 inline-flex items-center text-sm transition-colors w-full whitespace-nowrap'
              }
              rel="noreferrer">
              <span className="block">
                <Icon
                  className="w-5 h-5"
                  aria-hidden="true"
                  icon={'DocsIcon'}
                />
              </span>
              <span className="ml-4 sidebar-nav-item-desc">{'Docs'}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SidebarContent;
