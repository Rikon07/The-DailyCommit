import { Navigate, useLocation } from "react-router";
import Loader from "../Components/Extra Components/Loader";
import useAuth from "../Hooks/UseAuth";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
  const location = useLocation();


  if (loading) {
    return (
      <Loader />
  );
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;

};

export default PrivateRoute;