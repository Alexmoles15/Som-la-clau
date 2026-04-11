import React from "react";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const location = useLocation();

  const usuarioGuardado = localStorage.getItem("usuario");

  if (!usuarioGuardado) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  try {
    const usuario = JSON.parse(usuarioGuardado);

    if (!usuario) {
      return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }
  } catch {
    localStorage.removeItem("usuario");
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;