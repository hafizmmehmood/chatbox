import React from 'react'
import DesktopSidebar from './DesktopSidebar'
import MobileSidebar from './MobileSidebar'

function Sidebar(props) {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar />
    </>
  )
}

export default Sidebar
