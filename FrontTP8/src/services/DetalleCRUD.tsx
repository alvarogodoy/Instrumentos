import PedidoDetalle from "../types/PedidoDetalle";

export async function createDetalle(detalle: PedidoDetalle) {
  const url = "http://localhost:8080/api/detalles";
  const jsonData = JSON.stringify(detalle);
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: jsonData,
  };
  const response = await fetch(url, options);
  return response;
}
