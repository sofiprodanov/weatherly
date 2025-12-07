import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';


const PublicOnlyRoute = ({ children }) => {
  const { user } = useAuth();
  
  const location = useLocation();

  if (user) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return children;
};

export default PublicOnlyRoute;