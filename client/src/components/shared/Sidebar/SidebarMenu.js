import React from 'react';
import routes from '../../../routes/sidebar';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink, Route, useLocation } from 'react-router-dom';
import * as Icons from '../../../icons';
import SidebarSubmenu from './SidebarSubmenu';
import clsx from 'clsx';

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

function SidebarMenu() {
  const location = useLocation();
  const role = localStorage.getItem('role');
  const Routes =
    role && role !== 'super'
      ? routes.filter((r) => r.path !== '/admins')
      : routes;
  return (
    <>
      <PerfectScrollbar>
        <div>
          <ul>
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
                      'flex items-center w-full text-sm font-semibold transition-colors duration-150  hover:text-indigo-500 dark:hover:text-gray-200 whitespace-nowrap',
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
                    <span className="block">
                      <Icon
                        className="w-5 h-5"
                        aria-hidden="true"
                        icon={route.icon}
                      />
                    </span>

                    <span className="ml-4 sidebar-nav-item-desc">
                      {route.name}
                    </span>
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </div>
      </PerfectScrollbar>
    </>
  );
}

export default SidebarMenu;
