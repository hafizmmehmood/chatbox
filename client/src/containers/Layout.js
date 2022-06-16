import React, {useState, useContext, Suspense, useEffect, lazy,useCallback } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { routes } from '../routes';
import Sidebar from '../components/shared/Sidebar';
import Header from '../components/shared/Header';
import Main from '../containers/Main';
import ThemedSuspense from '../components/shared/ThemedSuspense';
import { SidebarContext } from '../context/SidebarContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page404 = lazy(() => import('../pages/404'));

function Layout() {
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
      <Sidebar toggleSideBar={toggleSideBar} HandleToggleSideBar={HandleToggleSideBar} />
      <div className="flex flex-col flex-1 w-full">
        <Header  toggleSideBar={toggleSideBar} />
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
        <Main toggleSideBar={toggleSideBar}>
          <Suspense fallback={<ThemedSuspense />}>
            <Switch>
              {routes.map((route, i) => {
                return route.component ? (
                  <Route
                    key={i}
                    exact={true}
                    path={`${route.path}`}
                    render={(props) => <route.component {...props} />}
                  />
                ) : null;
              })}
              <Redirect exact from="/" to="/dashboard" />
              <Redirect to="/dashboard" />
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </Main>
      </div>
    </div>
  );
}

export default Layout;
