import Instrumento from "../types/Instrumento";
import { useCart } from "../context/CartProvider";
import PedidoDetalle from "../types/PedidoDetalle";
import Pedido from "../types/Pedido";
import { Box, Button, Typography } from "@mui/material";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function InstrumentoItem(args: Instrumento) {
  const { cart, setCart } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const calculoTotal = (detalles: PedidoDetalle[]): number => {
    let total = 0;
    detalles.map((det) => {
      total += det.cantidad * det.instrumento.precio;
    });

    return total;
  };

  const handleDetail = (id: string) => {
    console.log(args.imagen);
    navigate(`/detalle/${id}`);
  };
  const handleAdd = () => {
    if (usuario) {
      addInstrumentToCart(args);
    } else {
      navigate("/login");
    }
  };

  const addInstrumentToCart = (instrumento: Instrumento) => {
    let detalle;
    let carrito;

    if (cart) {
      carrito = cart;
      const index = carrito.detalles.findIndex(
        (carritoItem) => carritoItem.id === instrumento.id
      );

      if (index !== -1) {
        carrito.detalles[index].cantidad += 1;
      } else {
        detalle = new PedidoDetalle();
        detalle.id = instrumento.id;
        detalle.instrumento = instrumento;
        carrito.detalles.push({ ...detalle, cantidad: 1 });
      }
      console.log(carrito);
      carrito.totalPedido = calculoTotal(carrito.detalles);
      setCart(carrito);
    } else {
      carrito = new Pedido();
      detalle = new PedidoDetalle();
      detalle.id = instrumento.id;
      detalle.instrumento = instrumento;
      carrito.detalles.push({ ...detalle, cantidad: 1 });
      carrito.totalPedido = calculoTotal(carrito.detalles);
      setCart(carrito);
    }

    localStorage.setItem("cart", JSON.stringify(carrito));
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          bgcolor: "#eee",
          borderRadius: 8,
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          height: 160,
          padding: 0,
        }}
      >
        <img src={args.imagen} />
        <Box
          sx={{
            width: "85%",
            display: "flex",
            flexDirection: "column",
            padding: 1,
          }}
        >
          <Typography variant="subtitle1">{args.instrumento}</Typography>
          <Typography variant="subtitle1">
            <b>${args.precio}</b>
          </Typography>
          <Typography>
            {args.costoEnvio === "G" && (
              <img src="public/img/camion.png" alt="" />
            )}
            <span
              style={{
                color: args.costoEnvio === "G" ? "LimeGreen" : "DarkOrange",
              }}
            >
              {args.costoEnvio === "G"
                ? "Envío gratis a todo el país"
                : "Costo de Envío interior de Argentina: $" + args.costoEnvio}
            </span>
          </Typography>
          <Typography>{args.cantidadVendida} vendidos</Typography>
        </Box>
        <Box sx={{ marginRight: 0, display: "flex", flexDirection: "column" }}>
          <Button
            style={{ color: "#fff", backgroundColor: "#4a4", height: "70%" }}
            onClick={handleAdd}
          >
            Agregar al carrito
          </Button>
          <Button
            onClick={() => handleDetail(args.id)}
            style={{ color: "#fff", backgroundColor: "#44a", height: "30%" }}
          >
            Ver detalle
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default InstrumentoItem;
