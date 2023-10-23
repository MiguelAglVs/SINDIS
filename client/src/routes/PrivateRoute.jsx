import { Navigate } from "react-router-dom";

function PrivateRoute({ token, children, redirectTo = "/" }) {
  if (!token) {
    // return <Navigate to={redirectTo} />;
    console.log(redirectTo);
    window.location.href = redirectTo;
  }

  return children;
}

export default PrivateRoute;
