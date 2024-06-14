// App.tsx
import { Route, Routes } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Where from "./pages/Where";
import RutaPrivada from "./routes/RutaPrivada";
import Signup from "./pages/Signup";
import Grilla from "./pages/Grilla";
import Charts from "./pages/Charts";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
      <Route path="/instrumentos" element={<Products />} />
      <Route path="/donde-estamos" element={<Where />} />
      <Route path="/charts" element={<Charts />} />
      <Route path="/detalle/:id" element={<Detail />} />
      <Route
        path="/grilla"
        element={
          <RutaPrivada>
            <Grilla />
          </RutaPrivada>
        }
      />
    </Routes>
  );
}

export default App;
