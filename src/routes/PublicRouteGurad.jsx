import { useContext } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const location = useLocation();
  const { user, userLoaded } = useContext(AuthContext);
  if (userLoaded) {
    if (!user) return children;
    return <Navigate to={location?.state?.from || "/issues"}></Navigate>;
  } else {
    return (
      <div
        style={{ display: "grid", minHeight: "100vh", placeItems: "center" }}
      >
        <Spinner animation="grow" size="lg" />
      </div>
    );
  }
};

export default PublicRoute;
