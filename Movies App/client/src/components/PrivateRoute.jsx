import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { loading, isAuthenticated } = useAuth();
  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
