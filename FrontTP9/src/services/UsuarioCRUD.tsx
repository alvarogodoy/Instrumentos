import Usuario from "../types/Usuario";

export async function getUsuarios() {
  const url = "http://localhost:8080/login";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  });
  return (await response.json()) as Usuario[];
}

export async function getUsuarioByUsername(nombreUsuario: string) {
  const url = "http://localhost:8080/login/" + nombreUsuario;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  });
  if (response.status == 404) {
    return null;
  } else {
    return (await response.json()) as Usuario;
  }
}

export async function checkPassword(user: Usuario) {
  const url = "http://localhost:8080/login/checkPass";
  const jsonData = JSON.stringify(user);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  };
  const response = await fetch(url, options);
  if (response.status == 404) return null;
  return (await response.json()) as Usuario;
}

export async function createUsuario(user: Usuario) {
  const url = "http://localhost:8080/login";
  const jsonData = JSON.stringify(user);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  };
  const response = await fetch(url, options);
  return (await response.json()) as Usuario;
}
