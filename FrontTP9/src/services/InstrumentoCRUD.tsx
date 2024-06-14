import Instrumento from "../types/Instrumento";

export async function getInstrumentos() {
  const url = "http://localhost:8080/api/instrumentos";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  });
  let instrumentos: Instrumento[] = await response.json();

  const instrumentosActivos = instrumentos.filter(
    (instrumento) => !instrumento.eliminado
  );

  return instrumentosActivos;
}

export async function getInstrumentoById(id: string) {
  const url = "http://localhost:8080/api/instrumentos/" + id;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  });
  return (await response.json()) as Instrumento;
}

export async function createInstrumento(instrumento: Instrumento) {
  const url = "http://localhost:8080/api/instrumentos";
  const jsonData = JSON.stringify(instrumento);
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: jsonData,
  };
  const response = await fetch(url, options);
  return response;
}

export async function updateInstrumento(instrumento: Instrumento) {
  const url = "http://localhost:8080/api/instrumentos/" + instrumento.id;
  const jsonData = JSON.stringify(instrumento);

  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: jsonData,
  };

  const response = await fetch(url, options);
  return response;
}
