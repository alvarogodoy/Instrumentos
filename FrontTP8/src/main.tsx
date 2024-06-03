import React from "react";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { CartProvider } from "./context/CartProvider.tsx";
import { createRoot } from "react-dom/client";
import LayoutApp from "./layout/LayoutApp.tsx";

const container = document.getElementById("root");

const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <CssBaseline>
            <LayoutApp>
              <App />
            </LayoutApp>
          </CssBaseline>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
