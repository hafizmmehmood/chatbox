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
      <div className="sidebar-header flex p-3 mb-3 overflow-hidden">
        <SidebarHeader />
        <div className="absolute -right-4 z-50 ${toggleSideBar toggle-sidebar-btn">
          <Tooltip
            title={toggleSideBar ? 'Collapse sidebar' : 'Expand sidebar'}
            className="z-100"
            placement="right"
            arrow>
            {toggleSideBar ? (
              <span className='block border-2 bg-white dark:bg-gray-300 border-indigo-600 p-2 rounded-full'>
                <FaArrowRight
                  onClick={HandleToggleSideBar}
                  className="text-indigo-600 text-sm cursor-pointer"
                />
              </span>
            ) : (
              <span className='block border-2 bg-white dark:bg-gray-300 border-indigo-600 p-2 rounded-full'>
                <FaArrowLeft
                  onClick={HandleToggleSideBar}
                  className="text-indigo-600 text-sm cursor-pointer"
                />
              </span>
            )}
          </Tooltip>
        </div>
      </div>

      <div className="h-full overflow-y-auto overflow-x-visible">
        <SidebarMenu />
      </div>

      <ul>
        <li className="px-6 py-3 relative border-top-1">
          <a
            target="_blank"
            href={process.env.REACT_APP_DOCS_URL}
            className={
              'cursor-pointer dark:hover:text-gray-200 duration-150 font-semibold hover:text-indigo-500 inline-flex items-center text-gray-400 text-sm transition-colors w-full whitespace-nowrap'
            }
            rel="noreferrer">
            <span className="block">
              <Icon className="w-5 h-5" aria-hidden="true" icon={'DocsIcon'} />
            </span>
            <span className="ml-4 sidebar-nav-item-desc">{'Docs'}</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SidebarContent;
