import { useEffect, useState } from "react";
import Instrumento from "../types/Instrumento";
import { getInstrumentos } from "../services/InstrumentoCRUD";
import InstrumentoItem from "../components/InstrumentoItem";

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
    <>
      <br />
      <p />
      <div className="row">
        {instrumentos.map((i: Instrumento) => (
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
          />
        ))}
      </div>
    </>
  );
}

export default Products;
