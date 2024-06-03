import PedidoDetalle from "./PedidoDetalle";

class Pedido {
    fechaPedido: Date = new Date();
    totalPedido: number = 0;
    detalles: Array<PedidoDetalle> = new Array<PedidoDetalle>();
}

export default Pedido;