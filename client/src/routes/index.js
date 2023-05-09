import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ProtectedRoutes } from './ProtectedRoutes';

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const Admins = lazy(() => import('../pages/admin/Admins'));
const Login = lazy(() => import('../pages/auth/Login'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));
const Confirmation = lazy(() => import('../pages/auth/Confirmation'));
const Page404 = lazy(() => import('../pages/404'));

const PageRoutes = () => {
  const { token } = useSelector((state) => state.auth);
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route element={<ProtectedRoutes token={token} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admins" element={<Admins />} />
          <Route path="/transaction" element={<Admins />} />
          <Route path="/abc" element={<Page404 />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
}

export default PageRoutes;
