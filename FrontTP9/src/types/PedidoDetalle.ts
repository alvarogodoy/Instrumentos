import Instrumento from "./Instrumento";

class PedidoDetalle {
    id?: string;
    instrumento: Instrumento = new Instrumento();;
    cantidad: number = 0;
}

export default PedidoDetalle;