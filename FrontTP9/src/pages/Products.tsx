import { useEffect, useState } from "react";
import Instrumento from "../types/Instrumento";
import { getInstrumentos } from "../services/InstrumentoCRUD";
import InstrumentoItem from "../components/InstrumentoItem";
import { List, ListItem } from "@mui/material";

function Products() {
  const imgPath = "src\\assets\\img\\";
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const response = await getInstrumentos();
        const fetchedInstruments = response as Instrumento[];
        setInstrumentos(fetchedInstruments);
      } catch (error) {
        console.error("Error fetching instruments:", error);
      }
    };

    fetchInstruments();
  }, []);
  return (
    <List sx={{ width: 800, height: "100vh" }}>
      {instrumentos.map((i: Instrumento) => (
        <ListItem key={i.id}>
          <InstrumentoItem
            key={i.id}
            id={i.id}
            instrumento={i.instrumento}
            marca={i.marca}
            modelo={i.modelo}
            imagen={imgPath + i.imagen}
            precio={i.precio}
            costoEnvio={i.costoEnvio}
            cantidadVendida={i.cantidadVendida}
            descripcion={i.descripcion}
            categoria={i.categoria}
            eliminado={i.eliminado}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default Products;
