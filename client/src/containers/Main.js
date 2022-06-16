import React from 'react'

function Main(props) {

  return (
    <main className={`flex flex-1 flex-col h-full overflow-y-auto dark:bg-slate-700 app-cont ${props.toggleSideBar ? 'lg:collapse-app-cont' : 'lg:expand-app-cont'}`}>
      <div className='p-1'>
        <div className="grid px-6 mx-auto">{props.children}</div>
      </div>
    </main>
  )
}

export default Main
