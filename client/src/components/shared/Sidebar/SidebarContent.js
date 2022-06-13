import React from 'react';
import routes from '../../../routes/sidebar';
import { NavLink, Route, useLocation } from 'react-router-dom';
import * as Icons from '../../../icons';
import SidebarSubmenu from './SidebarSubmenu';
import { serverUrl } from '../../../config/config';
import clsx from 'clsx';

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

const org = JSON.parse(localStorage.getItem('organization'));

function SidebarContent() {
  const location = useLocation();
  const role = localStorage.getItem('role');
  const Routes =
    role && role !== 'super'
      ? routes.filter((r) => r.path !== '/admins')
      : routes;
  return (
    <div className="text-gray-500 dark:text-gray-400">
      <div className="flex p-3 px-6">
        <a
          className="text-lg font-bold text-gray-800 dark:text-gray-200"
          href="/dashboard">
          {org && org.logoUrl ? (
            <span className="flex items-center">
              <img
                src={serverUrl + '/' + org?.logoUrl}
                alt="logo"
                className="w-12 h-12 mr-2"
              />{' '}
              <span>
                {org && org.organizationName ? org.organizationName : 'Amotius'}
              </span>
            </span>
          ) : (
            <span className="flex items-center">
              <img src={'/logo.svg'} alt="logo" className="w-12 h-12 mr-2" />{' '}
              <span className="text-blue-700 dark:text-blue-200">Amotius</span>
            </span>
          )}
        </a>
      </div>
      <ul className="mt-2">
        {Routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li
              className={
                location.pathname.includes(route.path)
                  ? 'relative px-6 py-3 bg-nav-gradient text-indigo-700' +
                    (route.seperator ? ' border-top-1' : '')
                  : 'relative px-6 py-3' +
                    (route.seperator ? ' border-top-1' : '')
              }
              key={route.name}>
              <NavLink
                exact
                to={route.path}
                className={clsx(
                  'inline-flex items-center w-full text-sm font-semibold transition-colors duration-150  hover:text-indigo-500 dark:hover:text-gray-200',
                  location.pathname.includes(route.path)
                    ? 'text-indigo-700'
                    : 'text-gray-400'
                )}
                activeClassName="text-indigo-600 dark:text-gray-100">
                <Route path={route.path} exact={route.exact}>
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-indigo-500 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"></span>
                </Route>
                <Icon
                  className="w-5 h-5"
                  aria-hidden="true"
                  icon={route.icon}
                />
                <span className="ml-4">{route.name}</span>
              </NavLink>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default SidebarContent;
