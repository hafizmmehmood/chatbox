import React, { lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer';
import { useSelector } from 'react-redux';
import PageRoutes from './routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Layout = lazy(() => import('./containers/Layout'));


function App() {
   const { token } = useSelector((state) => state.auth);
  return (
    <Router>
      <AccessibleNavigationAnnouncer />
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
      {token ? <Layout /> : <PageRoutes />}
    </Router>
  );
}

export default App;
