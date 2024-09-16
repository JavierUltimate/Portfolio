import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { Alert } from "@mui/material";

export default function PrivateRouteAdmin() {
  const { isAdmin } = useAuth();
  console.log(isAdmin)
  if (!isAdmin ) return (<>

        <Navigate to={"/login"} replace />;
  
  </>)
  return <Outlet />;
}
