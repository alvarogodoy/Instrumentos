import Categoria from "../types/Categoria";

export async function getCategorias() {
  const url = "http://localhost:8080/api/categorias";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  });
  return (await response.json()) as Categoria[];
}

export async function getCategoriaById(id: number) {
  const url = "http://localhost:8080/api/categorias/" + id;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  });
  return await response.json();
}
