import React from 'react';
import routes from '../../../routes/sidebar';
import { NavLink, useLocation } from 'react-router-dom';
import * as Icons from '../../../icons';

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

const MenuBarContent = () => {
  const location = useLocation();

  return (
    <div className="navigation">
      <ul className='text-blue-700 dark:text-blue-200'>
        {routes.map((route) => (
          <li
            className={`list ${
              location.pathname.includes(route.path) && 'active'
            } `}
            key={route.name}>
            <NavLink exact to={route.path}>
              <div>
                <span className="icon">
                  <Icon
                    className="w-5 h-5"
                    aria-hidden="true"
                    icon={route.icon}
                  />
                </span>
              </div>
              <span className="nav-item-desc">{route.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuBarContent;
