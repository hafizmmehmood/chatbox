import React from 'react'
import MenuBarContent from '../MenuBar'

const DesktopMenuBar = (props) => {

  return (
    <aside className="menu-bar-cont dark:bg-gray-800 hidden lg:flex justify-center align-center">
      <MenuBarContent {...props} />
    </aside>
  )
}

export default DesktopMenuBar
