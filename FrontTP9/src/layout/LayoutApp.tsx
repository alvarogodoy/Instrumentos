import { ReactNode } from "react";
import { Box, Container, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import ShopCart from "../components/ShopCart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

interface LayoutProps {
  children: ReactNode;
}

function LayoutApp({ children }: LayoutProps) {
  const navigate = useNavigate();
  const { usuario, setUsuario } = useAuth();

  const handleLogout = () => {
    setUsuario(null);
    navigate("/login");
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        bgcolor: "#ddd",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          height: 60,
          marginTop: 2,
        }}
      >
        {usuario ? (
          <Button
            onClick={handleLogout}
            sx={{
              bgcolor: "#c44",
              color: "#fff",
              borderRadius: 8,
              mr: 2,
              textTransform: "none",
            }}
          >
            Cerrar sesion
          </Button>
        ) : null}

        <Navbar />
        <ShopCart />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 2,
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Container>
  );
}

export default LayoutApp;
