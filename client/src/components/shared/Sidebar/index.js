import React from 'react'
import DesktopSidebar from './DesktopSidebar'
import DesktopMenuBar from './DesktopMenuBar'
import MobileSidebar from './MobileSidebar'

function Sidebar(props) {
  return (
    <>
      {props.menuType==='bottom'  && <DesktopMenuBar {...props} />}
      {props.menuType==='left' && <DesktopSidebar {...props} /> }
      <MobileSidebar />
    </>
  )
}

export default Sidebar
