import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import * as Icons from '../../../icons';
import { serverUrl } from '../../../config/config';
import SidebarMenu from './SidebarMenu';

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

const org = JSON.parse(localStorage.getItem('organization'));

function SidebarContent({ toggleSideBar, HandleToggleSideBar }) {
  return (
    <div className="flex flex-col h-full w-full text-gray-500 dark:text-gray-400 relative">
      <div className="sidebar-header flex p-3 mb-3 overflow-hidden">
        <a
          className="text-lg font-bold text-gray-800 dark:text-gray-200 whitespace-nowrap"
          href="/dashboard">
          {org && org.logoUrl ? (
            <span className="flex items-center">
              <img
                src={serverUrl + '/' + org?.logoUrl}
                alt="logo"
                className="w-12 h-12 mr-2"
              />{' '}
              <span className="logo-dec text-blue-700 dark:text-blue-200">
                {org && org.organizationName
                  ? org.organizationName
                  : 'Crypt Stake'}
              </span>
            </span>
          ) : (
            <span className="flex items-center">
              <img src={'/logo.svg'} alt="logo" className="w-12 h-12 mr-2" />{' '}
              <span className="logo-dec text-blue-700 dark:text-blue-200">
                Crypt Stake
              </span>
            </span>
          )}
        </a>

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
