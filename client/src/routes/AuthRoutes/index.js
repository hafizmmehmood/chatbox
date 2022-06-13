import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { authRoutes } from '../../routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from '../../containers/Main';
import ThemedSuspense from '../../components/shared/ThemedSuspense';
const Page404 = lazy(() => import('../../pages/404'));

const Routes = () => {
  return (
    <div className={'flex h-screen bg-gray-50 dark:bg-gray-900'}>
      <div className="flex flex-col flex-1 w-full">
        <ToastContainer
          position="top-center"
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
        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Switch>
              {authRoutes.map((route, i) => {
                return route.component ? (
                  <Route
                    key={i}
                    exact={true}
                    path={`${route.path}`}
                    render={(props) => <route.component {...props} />}
                  />
                ) : null;
              })}
              <Redirect exact from="/" to="/login" />
              <Redirect to="/login" />
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </Main>
      </div>
    </div>
  );
};
export default Routes;
