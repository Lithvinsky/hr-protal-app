import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./services/authService.js";

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
