import React, { useContext } from 'react';
import { SidebarContext } from '../../../context/SidebarContext';
import { ThemeContext } from '../../../context/ThemeContext';
import { MenuIcon } from '../../../icons';
import { FaSun, FaMoon } from 'react-icons/fa';
import Dropdown from '../../shared/Dropdown';
import { serverUrl } from '../../../config/config';
import SidebarHeader from '../Sidebar/SidebarHeader';
import MenuBarContent from '../MenuBar';

function Header({ menuType, toggleSideBar }) {
  const org = JSON.parse(localStorage.getItem('organization'));
  const { toggleSidebar } = useContext(SidebarContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const menuPosition = menuType === 'bottom' || menuType === 'top';
  const isTopMenu = menuType === 'top';
  return (
    <header
      className={`z-40 py-4 bg-white dark:bg-gray-800 main-header ${
        menuPosition
          ? 'top-header'
          : toggleSideBar
          ? 'lg:collapse-header'
          : 'lg:expand-header'
      }`}>
      <div className="flex items-center justify-between h-full px-6 mx-auto text-blue-700 dark:text-blue-200">
        <div className="hidden lg:flex">
          {menuPosition && <SidebarHeader />}
          {isTopMenu && <MenuBarContent />}
        </div>

        <div className="flex overflow-hidden lg:hidden ">
          <a
            className="text-lg font-bold text-gray-800 dark:text-gray-200 whitespace-nowrap"
            href="/dashboard">
            {org && org.logoUrl ? (
              <span className="flex items-center">
                <img
                  src={serverUrl + '/' + org?.logoUrl}
                  alt="logo"
                  className="w-12 h-12 mr-2"
                />
              </span>
            ) : (
              <span className="flex items-center">
                <img src={'/logo.svg'} alt="logo" className="w-12 h-12 mr-2" />
              </span>
            )}
          </a>
          <button
            className="p-1 mr-5 -ml-1 rounded-md focus:outline-none focus:shadow-outline-purple"
            onClick={toggleSidebar}
            aria-label="Menu">
            <MenuIcon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        <div className="dark:text-gray-400 duration-500 ease-in-out font-medium pr-4 rounded-full text-gray-500 text-xl transition">
          {org && org.organizationName}
        </div>
        <div className='flex'>
          <div className="transition duration-500 ease-in-out rounded-full p-2">
            {theme === 'dark' ? (
              <FaSun
                onClick={toggleTheme}
                className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
              />
            ) : (
              <FaMoon
                onClick={toggleTheme}
                className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
              />
            )}
          </div>
          <div className="flex items-center flex-shrink-0 space-x-6">
            <Dropdown />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
