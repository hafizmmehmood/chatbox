import React from 'react'
import SidebarContent from './SidebarContent'
import clsx from 'clsx';


function DesktopSidebar(props) {
  const {toggleSideBar} = props;

  return (
    <aside className={clsx("sidebar-cont hidden flex-col h-full lg:flex", toggleSideBar ? "collapse-sidebar" : "expand-sidebar") }>
      <SidebarContent {...props} />
    </aside>
  )
}

export default DesktopSidebar
