import Pedido from "../types/Pedido";
import PreferenceMP from "../types/PreferenceMP";

export async function createPreference(pedido: Pedido) {
  const url = "http://localhost:8080/api/pedidos/preference";
  const jsonData = `{
      "fechaPedido": "${pedido.fechaPedido}",
      "totalPedido": ${pedido.totalPedido}
  }`;
  console.log(jsonData);
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: jsonData,
  };
  const response = await fetch(url, options);
  return (await response.json()) as PreferenceMP;
}
