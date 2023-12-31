import React, { useContext } from 'react';
import SidebarContent from './SidebarContent';
import { SidebarContext } from '../../../context/SidebarContext';

function MobileSidebar() {
  const { isSidebarOpen } = useContext(SidebarContext);
  return (
    <>
      <aside
        className={`sidebar-cont toggle-sidebar fixed inset-y-0 flex-shrink-0 mt-16 overflow-y-auto lg:w-0 z-50 ${
          isSidebarOpen ? 'w-64' : 'w-0'
        }`}>
        <SidebarContent />
      </aside>
    </>
  );
}

export default MobileSidebar;
