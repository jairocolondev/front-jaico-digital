import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ hostProduction, children }) => {
  if (hostProduction) {
    return <Navigate to="/en-mantenimiento" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  hostProduction: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export { ProtectedRoute };
