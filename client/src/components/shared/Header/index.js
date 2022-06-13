import React, { useContext } from 'react';
import { SidebarContext } from '../../../context/SidebarContext';
import { ThemeContext } from '../../../context/ThemeContext';
import { MenuIcon } from '../../../icons';
import { FaSun, FaMoon } from 'react-icons/fa';
import Dropdown from '../../shared/Dropdown';

function Header() {
  const org = JSON.parse(localStorage.getItem('organization'));
  const { toggleSidebar } = useContext(SidebarContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header className="z-40 py-4 bg-white dark:bg-gray-800 main-header">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-blue-700 dark:text-blue-200">
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu">
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        <div className="flex justify-center flex-1 lg:mr-32"></div>
        <div className="dark:text-gray-400 duration-500 ease-in-out font-medium pr-4 rounded-full text-gray-500 text-xl transition">
          {org && org.organizationName}
        </div>
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
    </header>
  );
}

export default Header;
