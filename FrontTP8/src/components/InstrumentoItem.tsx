import { Button } from "react-bootstrap";
import Instrumento from "../types/Instrumento";
import { useCart } from "../context/CartProvider";
import PedidoDetalle from "../types/PedidoDetalle";
import Pedido from "../types/Pedido";

function InstrumentoItem(args: Instrumento) {
  const { cart, setCart } = useCart();

  const addInstrumentToCart = (instrumento: Instrumento) => {
    let detalle: PedidoDetalle = new PedidoDetalle();
    let carrito;
    detalle.instrumento = instrumento;
    detalle.cantidad = 1;
    if (cart) {
      carrito = cart;
    } else {
      carrito = new Pedido();
      setCart(carrito);
    }
    carrito.detalles.push(detalle);
    setCart(carrito);
    localStorage.setItem("cart", JSON.stringify(carrito));
  };

  return (
    <>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-3">
            <img
              src={args.imagen}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <p className="card-text descripcion">{args.instrumento}</p>
              <h5 className="card-title titulo">$ {args.precio}</h5>
              <p className="card-text">
                <small className="text-body-primary">
                  {args.costoEnvio === "G" && (
                    <img src="public/img/camion.png" alt="" />
                  )}
                  <span
                    style={{
                      color:
                        args.costoEnvio === "G" ? "LimeGreen" : "DarkOrange",
                    }}
                  >
                    {args.costoEnvio === "G"
                      ? "Envío gratis a todo el país"
                      : "Costo de Envío interior de Argentina: $" +
                        args.costoEnvio}
                  </span>
                </small>
              </p>
              <p className="card-text">
                <small className="text-body-secondary">
                  {args.cantidadVendida + " vendidos"}
                </small>
              </p>
              <Button
                href={`detalle/${args.id}`}
                className="text-decoration-none"
                variant="primary"
              >
                Ver Detalle
              </Button>
              <span> </span>
              <Button
                variant="success"
                onClick={() => addInstrumentToCart(args)}
              >
                Agregar al carrito
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InstrumentoItem;
