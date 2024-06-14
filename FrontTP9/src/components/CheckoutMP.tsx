import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useState } from "react";
import PreferenceMP from "../types/PreferenceMP";
import { createPreference } from "../services/PreferenceMP";
import { Box, Button } from "@mui/material";
import { useCart } from "../context/CartProvider";

function CheckoutMP() {
  const [idPreference, setIdPreference] = useState<string>("");
  const { cart } = useCart();

  async function getPreferenceMP() {
    if (cart) {
      console.log(cart);
      const response: PreferenceMP = await createPreference(cart);
      if (response) setIdPreference(response.id);
    }
  }
  initMercadoPago("TEST-0ad1da8d-2039-47d2-a62c-967537a50f6c");

  return (
    <>
      <div>
        <Button
          sx={{
            color: "#111",
            bgcolor: "#4a4",
            marginTop: 1,
            width: "50%",
          }}
          onClick={() => getPreferenceMP()}
        >
          Pagar
        </Button>
        <Box display={idPreference ? "flex" : "none"}>
          <Wallet
            initialization={{
              preferenceId: idPreference,
              redirectMode: "blank",
            }}
            customization={{ texts: { valueProp: "smart_option" } }}
          />
        </Box>
      </div>
    </>
  );
}

export default CheckoutMP;
