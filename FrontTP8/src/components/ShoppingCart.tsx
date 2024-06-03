import { useEffect } from "react";
import { useCart } from "../context/CartProvider";
import { createPedido } from "../services/PedidoCRUD";
import Pedido from "../types/Pedido";
import CheckoutMP from "./CheckoutMP";
import PedidoDetalle from "../types/PedidoDetalle";

function ShoppingCart() {
  const { cart, setCart } = useCart();

  let total = 0;

  useEffect(() => {
    cart?.detalles.map((detalle) => {
      total += Number(detalle.instrumento?.precio);
      cart.totalPedido = total;
    });
    console.log(cart?.totalPedido);
    setCart(cart);
  });

  function persistCart(pedido: Pedido | null) {
    let total = 0;
    if (pedido) {
      pedido.detalles.map((detalle) => {
        total += Number(detalle.instrumento?.precio);
      });
      pedido.totalPedido = total;
      createPedido(pedido);
      setCart(null);
    } else {
      alert("El carrito esta vacio");
    }
  }

  return (
    <>
      <button
        id="save"
        type="button"
        className="btn btn-primary position-relative"
        onClick={() => {
          persistCart(cart);
        }}
      >
        Guardar carrito
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {cart ? cart.detalles.length : 0}
          <span className="visually-hidden">articulos</span>
        </span>
      </button>
      <CheckoutMP
        fechaPedido={cart ? cart.fechaPedido : new Date()}
        totalPedido={cart ? cart.totalPedido : 0}
        detalles={cart ? cart.detalles : new Array<PedidoDetalle>()}
      ></CheckoutMP>
    </>
  );
}

export default ShoppingCart;
