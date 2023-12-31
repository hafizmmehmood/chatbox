import React, {useState, useContext, Suspense, useEffect, lazy,useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import PageRoutes from '../routes';
import Sidebar from '../components/shared/Sidebar';
import Header from '../components/shared/Header';
import Main from '../containers/Main';
import ThemedSuspense from '../components/shared/ThemedSuspense';
import { SidebarContext } from '../context/SidebarContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Layout() {
  const menuType = "left";
  
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const [toggleSideBar,setToggleSideBar] = useState(false);
  
  const HandleToggleSideBar = useCallback(()=>{
    setToggleSideBar(!toggleSideBar);
  },[toggleSideBar])
  let location = useLocation();

  useEffect(() => {
    closeSidebar('layout');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
        isSidebarOpen && 'overflow-hidden'
      }`}>
      <Sidebar menuType={menuType} toggleSideBar={toggleSideBar} HandleToggleSideBar={HandleToggleSideBar} />
      <div className="flex flex-col flex-1 w-full">
        <Header menuType={menuType} toggleSideBar={toggleSideBar} />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="colored"
          pauseOnHover
        />
        <Main menuType = {menuType} toggleSideBar={toggleSideBar}>
          <Suspense fallback={<ThemedSuspense />}>
            <PageRoutes />
          </Suspense>
        </Main>
      </div>
    </div>
  );
}

export default Layout;
