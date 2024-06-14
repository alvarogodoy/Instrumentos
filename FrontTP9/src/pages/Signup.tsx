import {
  Alert,
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { createUsuario, getUsuarioByUsername } from "../services/UsuarioCRUD";
import Usuario from "../types/Usuario";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rol, setRol] = useState<string>("Visor");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleRolChange = (event: SelectChangeEvent) => {
    setRol(event.target.value as string);
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let user = await getUsuarioByUsername(username);
    if (!user) {
      user = new Usuario();
      user.nombreUsuario = username;
      user.clave = password;
      user.rol = rol;
      user = await createUsuario(user);
      if (user) navigate("/login");
    } else {
      setError("El nombre de usuario ingresado ya esta registrado");
    }
  };

  return (
    <>
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
          Registro
        </Typography>
        {error && (
          <Alert severity="error" variant="filled" sx={{ margin: 0 }}>
            {error}
          </Alert>
        )}
        <form
          onSubmit={handleSignUp}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="subtitle1">Usuario</Typography>
          <TextField
            size="small"
            value={username}
            sx={{ width: 350, marginBottom: 2 }}
            onChange={handleUsernameChange}
          />
          <Typography variant="subtitle1">Clave</Typography>
          <TextField
            type="password"
            size="small"
            value={password}
            sx={{ width: 350, marginBottom: 2 }}
            onChange={handlePasswordChange}
          />
          <Typography variant="subtitle1">Rol</Typography>
          <Select
            size="small"
            value={rol}
            sx={{ width: 150 }}
            onChange={handleRolChange}
          >
            <MenuItem value={"Administrador"}>Administrador</MenuItem>
            <MenuItem value={"Operador"}>Operador</MenuItem>
            <MenuItem value={"Visor"}>Visor</MenuItem>
          </Select>
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
            Registrarse
          </Button>
        </form>
      </Box>
    </>
  );
}

export default Signup;
