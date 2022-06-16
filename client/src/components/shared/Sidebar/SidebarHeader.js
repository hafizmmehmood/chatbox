import React from 'react';
import { serverUrl } from '../../../config/config';
const org = JSON.parse(localStorage.getItem('organization'));
const SidebarHeader = () => {
  return (
        <a
          className="min-w-fit pr-2 flex flex-shrink-0 text-lg font-bold text-gray-800 dark:text-gray-200 whitespace-nowrap"
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
  );
}

export default SidebarHeader;
