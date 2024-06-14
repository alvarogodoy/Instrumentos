import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

interface RutaPrivadaProps {
  children: React.ReactNode;
  rolesPermitidos: string[];
}

const RutaPrivada: React.FC<RutaPrivadaProps> = ({
  children,
  rolesPermitidos,
}) => {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (!rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default RutaPrivada;
