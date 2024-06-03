import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useCart } from "../context/CartProvider";
import DeleteIcon from "@mui/icons-material/Delete";

function ShopCart() {
  const [open, setOpen] = React.useState(false);
  let { cart, setCart } = useCart();
  let { usuario } = useAuth();

  let total = 0;

  useEffect(() => {
    cart?.detalles.map((detalle) => {
      total += Number(detalle.instrumento?.precio);
      cart.totalPedido = total;
    });
    console.log(cart?.totalPedido);
    setCart(cart);
  });

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      {usuario ? (
        <Badge
          color="error"
          overlap="circular"
          badgeContent={cart ? cart.detalles.length : "0"}
        >
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
            <ShoppingCartIcon fontSize="large"></ShoppingCartIcon>
          </Button>
        </Badge>
      ) : null}
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        <Box sx={{ height: "100vh", width: 350, bgcolor: "#ddd", padding: 2 }}>
          <Typography variant="h5" marginBottom={1}>
            Carrito
          </Typography>
          <Divider orientation="horizontal" />
          <List>
            {cart?.detalles.map((detalle) => (
              <ListItem>
                <Box sx={{ bgcolor: "#ddd", display: "flex" }}>
                  <Typography variant="subtitle1" width={"80%"}>
                    {detalle.instrumento?.instrumento}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ color: "#44a" }}>Cantidad</Typography>
                    <Typography sx={{ color: "#44a" }}>
                      {detalle.cantidad}
                    </Typography>
                  </Box>
                  <Button sx={{ color: "#000" }}>
                    <DeleteIcon />
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
          <Divider orientation="horizontal" />
          <Box display={"flex"} marginTop={1}>
            <Typography variant="h5">Total</Typography>
            <Typography variant="h5" marginLeft={6}>
              ${cart?.totalPedido}
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default ShopCart;
