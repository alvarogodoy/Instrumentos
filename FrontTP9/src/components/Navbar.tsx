import { Box, Typography, Link } from "@mui/material";
import { useAuth } from "../context/AuthProvider";

function Navbar() {
  let { usuario } = useAuth();

  return (
    <Box
      sx={{
        width: "35%",
        bgcolor: "#fff",
        justifySelf: "flex-start",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        boxShadow: 3,
        color: "#000",
      }}
    >
      {!usuario ? (
        <Box sx={{ m: 1 }}>
          <Typography variant="subtitle1" sx={{ textDecoration: "None" }}>
            <Link
              href="/login"
              sx={{
                textDecoration: "none",
                color: "inherit",
                "&:hover": {
                  textDecoration: "none",
                },
                "&:visited": {
                  color: "inherit",
                },
                "&:active": {
                  color: "inherit",
                },
              }}
            >
              Iniciar sesion
            </Link>
          </Typography>
        </Box>
      ) : null}
      <Box sx={{ m: 1 }}>
        <Typography variant="subtitle1" sx={{ textDecoration: "None" }}>
          <Link
            href="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              "&:hover": {
                textDecoration: "none",
              },
              "&:visited": {
                color: "inherit",
              },
              "&:active": {
                color: "inherit",
              },
            }}
          >
            Inicio
          </Link>
        </Typography>
      </Box>
      <Box sx={{ m: 1 }}>
        <Typography variant="subtitle1">
          <Link
            href="/instrumentos"
            sx={{
              textDecoration: "none",
              color: "inherit",
              "&:hover": {
                textDecoration: "none",
              },
              "&:visited": {
                color: "inherit",
              },
              "&:active": {
                color: "inherit",
              },
            }}
          >
            Productos
          </Link>
        </Typography>
      </Box>
      {usuario && usuario?.rol !== "Visor" ? (
        <Box sx={{ m: 1 }}>
          <Typography variant="subtitle1">
            <Link
              href="/grilla"
              sx={{
                textDecoration: "none",
                color: "inherit",
                "&:hover": {
                  textDecoration: "none",
                },
                "&:visited": {
                  color: "inherit",
                },
                "&:active": {
                  color: "inherit",
                },
              }}
            >
              Grilla
            </Link>
          </Typography>
        </Box>
      ) : null}
      {usuario && usuario?.rol !== "Visor" ? (
        <Box sx={{ m: 1 }}>
          <Typography variant="subtitle1">
            <Link
              href="/charts"
              sx={{
                textDecoration: "none",
                color: "inherit",
                "&:hover": {
                  textDecoration: "none",
                },
                "&:visited": {
                  color: "inherit",
                },
                "&:active": {
                  color: "inherit",
                },
              }}
            >
              Charts
            </Link>
          </Typography>
        </Box>
      ) : null}
      <Box sx={{ m: 1 }}>
        <Typography variant="subtitle1">
          <Link
            href="/donde-estamos"
            sx={{
              textDecoration: "none",
              color: "inherit",
              "&:hover": {
                textDecoration: "none",
              },
              "&:visited": {
                color: "inherit",
              },
              "&:active": {
                color: "inherit",
              },
            }}
          >
            Donde estamos
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Navbar;
