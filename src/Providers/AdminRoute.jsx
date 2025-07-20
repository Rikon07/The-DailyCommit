import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/UseAuth';
import useAdmin from '../Hooks/useAdmin';
import Loader from '../Components/Extra Components/Loader';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) return <Loader />;

  if (user && isAdmin) return children;

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
