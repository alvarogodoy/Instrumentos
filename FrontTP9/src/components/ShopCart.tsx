import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import PedidoDetalle from "../types/PedidoDetalle";
import { useAuth } from "../context/AuthProvider";
import { useCart } from "../context/CartProvider";
import CheckoutMP from "./CheckoutMP";
import { createPedido } from "../services/PedidoCRUD";
import Pedido from "../types/Pedido";

function ShopCart() {
  const [open, setOpen] = useState(false);
  const [cantidad, setCantidad] = useState<number>(0);
  const { cart, setCart } = useCart();
  const { usuario } = useAuth();

  useEffect(() => {
    if (cart?.detalles.length === 0) {
      setCart(null);
      localStorage.setItem("cart", "null");
    }
  });

  useEffect(() => {
    if (cart) {
      setCantidad(cart.detalles.length);
    } else {
      setCantidad(0);
    }
  }, [cart]);

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

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const eliminarItem = (id: string | undefined) => {
    if (cart) {
      const detalles = cart.detalles.filter((det) => det.id !== id);
      const totalPedido = calcularTotal(detalles);
      const nuevoCarrito = { ...cart, detalles, totalPedido };
      setCart(nuevoCarrito);
      localStorage.setItem("cart", JSON.stringify(nuevoCarrito));
    }
  };

  const calcularTotal = (detalles: PedidoDetalle[]): number => {
    return detalles.reduce(
      (total, det) => total + det.cantidad * det.instrumento.precio,
      0
    );
  };

  return (
    <>
      {usuario && (
        <Badge color="error" overlap="circular" badgeContent={cantidad}>
          <Button
            onClick={toggleDrawer(true)}
            sx={{
              width: 60,
              bgcolor: "#fff",
              ml: 3,
              borderRadius: "50%",
              color: "#000",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: 3,
            }}
          >
            <ShoppingCartIcon fontSize="large" />
          </Button>
        </Badge>
      )}
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        <div style={{ width: 350, padding: 20 }}>
          <Typography variant="h5" gutterBottom>
            Carrito
          </Typography>
          <Divider />
          <List>
            {cart?.detalles.map((detalle) => (
              <ListItem key={detalle.id}>
                <Typography>{detalle.instrumento?.instrumento}</Typography>
                <Typography>Cantidad: {detalle.cantidad}</Typography>
                <Button onClick={() => eliminarItem(detalle.id)}>
                  <DeleteIcon />
                </Button>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Typography variant="h6">
            Total: ${cart?.totalPedido.toFixed(2)}
          </Typography>
          {cart ? (
            <>
              <Button
                sx={{ color: "#111", bgcolor: "#44a", marginTop: 1 }}
                onClick={() => persistCart(cart)}
              >
                Guardar Carrito
              </Button>
              <CheckoutMP />
            </>
          ) : null}
        </div>
      </Drawer>
    </>
  );
}

export default ShopCart;
