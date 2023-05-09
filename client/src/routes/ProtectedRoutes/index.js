import { Navigate , Outlet} from 'react-router-dom';

export const ProtectedRoutes = ({ token, children }) => {
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};
