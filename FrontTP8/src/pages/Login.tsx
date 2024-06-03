import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useAuth } from "../context/AuthProvider";
import { useState } from "react";
import { checkPassword, getUsuarioByUsername } from "../services/UsuarioCRUD";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  // Limpiar el usuario del localStorage cuando se carga este componente
  localStorage.removeItem("usuario");

  // Obtener contexto de autenticación
  let { setUsuario } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let user = await getUsuarioByUsername(username);
    if (user) {
      user.clave = password;
      user = await checkPassword(user);
      if (user) {
        setUsuario(user);
        localStorage.setItem("usuario", JSON.stringify(user));
        navigate("/");
      } else {
        setError("Clave incorrecta");
      }
    } else {
      setError("El usuario ingresado no existe");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "40vw",
        height: "70vh",
        bgcolor: "#aaa",
        borderRadius: 8,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Inicio Sesion
      </Typography>
      {error && (
        <Alert severity="error" variant="filled" sx={{ margin: 0 }}>
          {error}
        </Alert>
      )}
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="subtitle1">Usuario</Typography>
        <TextField
          value={username}
          onChange={handleUsernameChange}
          size="small"
          sx={{ width: 350, marginBottom: 2 }}
        />
        <Typography variant="subtitle1">Clave</Typography>
        <TextField
          value={password}
          onChange={handlePasswordChange}
          type="password"
          size="small"
          sx={{ width: 350, marginBottom: 2 }}
        />
        <Button
          type="submit"
          sx={{
            marginTop: 2,
            color: "#fff",
            bgcolor: "#44c",
            borderRadius: 8,
            marginBottom: 1,
          }}
        >
          Iniciar Sesion
        </Button>
        <Typography variant="subtitle2">
          ¿No tiene una cuenta? <Link to={"/signup"}>Registrese</Link>
        </Typography>
      </form>
    </Box>
  );
}

export default Login;
