import Pedido from "../types/Pedido";

export async function createPedido(pedido: Pedido) {
  const url = "http://localhost:8080/api/pedidos";
  const jsonData = `{
    "fechaPedido": "${pedido.fechaPedido.toISOString()}",
    "totalPedido": ${pedido.totalPedido}
}`;
  console.log(jsonData);
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: jsonData,
  };
  const response = await fetch(url, options);
  return response;
}
