import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useState } from "react";
import PreferenceMP from "../types/PreferenceMP";
import { createPreference } from "../services/PreferenceMP";
import Pedido from "../types/Pedido";
import { Button } from "react-bootstrap";

function CheckoutMP(pedido: Pedido) {
  const [idPreference, setIdPreference] = useState<string>("");

  async function getPreferenceMP() {
    if (pedido.totalPedido == 0) {
      alert("Agregue al menos un item al carrito");
    } else {
      const response: PreferenceMP = await createPreference(pedido);
      if (response) setIdPreference(response.id);
    }
  }
  initMercadoPago("TEST-0ad1da8d-2039-47d2-a62c-967537a50f6c");

  return (
    <>
      <div>
        <Button variant="dark" onClick={getPreferenceMP}>
          Pagar con Mercado Pago
        </Button>
        <div className={idPreference ? "divVisible" : "divInvisible"}>
          <Wallet
            initialization={{
              preferenceId: idPreference,
              redirectMode: "blank",
            }}
            customization={{ texts: { valueProp: "smart_option" } }}
          />
        </div>
      </div>
    </>
  );
}

export default CheckoutMP;
