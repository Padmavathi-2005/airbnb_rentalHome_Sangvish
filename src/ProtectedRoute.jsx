import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // assuming `user` is null when logged out

  if (loading) {
    return <p>Loading...</p>; // you can replace this with a spinner
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
