import React from 'react';
import routes from '../../../routes/sidebar';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink, useLocation } from 'react-router-dom';
import * as Icons from '../../../icons';
import SidebarSubmenu from './SidebarSubmenu';
import clsx from 'clsx';

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

function SidebarMenu() {
  const location = useLocation();
  // const role = localStorage.getItem('role');
  // const Routes =
  //   role && role !== 'super'
  //     ? routes.filter((r) => r.path !== '/admins')
  //     : routes;
  return (
    <>
      <PerfectScrollbar>
        <div className='sidebar-navigation'>
          <ul>
            {routes.map((route) =>
              route.routes ? (
                <SidebarSubmenu route={route} key={route.name} />
              ) : (
                <li
                  key={route.name}>
                  <NavLink
                    exact
                    to={route.path}
                    className={clsx(
                      'flex items-center w-full text-sm font-semibold transition-colors duration-150  whitespace-nowrap',
                      location.pathname.includes(route.path) && 'active'
                    )}
                    activeClassName="text-indigo-600 dark:text-gray-100">
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
