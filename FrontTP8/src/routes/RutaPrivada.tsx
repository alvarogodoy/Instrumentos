import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const RutaPrivada: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { usuario } = useAuth();

  return usuario ? <>{children}</> : <Navigate to="/login" />;
};

export default RutaPrivada;
