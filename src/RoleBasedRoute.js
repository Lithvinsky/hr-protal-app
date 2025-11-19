// components/RoleBasedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

import { getCurrentUserRole } from "./services/authService";

const RoleBasedRoute = ({ allowedRoles, children }) => {
  const { role } = getCurrentUserRole();

  if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;

  return children;
};

export default RoleBasedRoute;
