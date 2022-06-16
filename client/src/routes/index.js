import { lazy } from 'react';

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const Admins = lazy(() => import('../pages/admin/Admins'));
const Login = lazy(() => import('../pages/auth/Login'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));
const Confirmation = lazy(() => import('../pages/auth/Confirmation'));
const Page404 = lazy(() => import('../pages/404'));

const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard // view rendered
  },
  {
    path: '/transaction', // the url
    component: Admins // view rendered
  },
  {
    path: '/admins',
    component: Admins
  },
  {
    path: '/abc',
    component: Page404
  }
];

const authRoutes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/forgot-password',
    component: ForgotPassword
  },
  {
    path: '/reset-password',
    component: ResetPassword
  },
  {
    path: '/confirmation',
    component: Confirmation
  }
];

export { routes, authRoutes };
