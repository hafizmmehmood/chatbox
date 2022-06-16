import React from 'react'
import SidebarContent from './SidebarContent'
import clsx from 'clsx';


function DesktopSidebar(props) {
  const {toggleSideBar} = props;

  return (
    <aside className={clsx("hidden flex-col h-full bg-white dark:bg-gray-800  lg:flex", toggleSideBar ? "collapse-sidebar" : "expand-sidebar") }>
      <SidebarContent {...props} />
    </aside>
  )
}

export default DesktopSidebar
