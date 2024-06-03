import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Instrumento from "../types/Instrumento";
import { getInstrumentoById } from "../services/InstrumentoCRUD";

function Detail() {
  const imgPath = "src\\assets\\img\\";
  const { id } = useParams();
  const [instrumento, setInstrumento] = useState<Instrumento>();
  const getInstrumento = async () => {
    const instrumentoSelect: Instrumento = await getInstrumentoById(String(id));
    setInstrumento(instrumentoSelect);
  };
  useEffect(() => {
    getInstrumento();
  }, []);

  return (
    <>
      <br />
      <p />
      <div className="container-fluid w-75" style={{ height: "100vh" }}>
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-6">
              <img
                src={imgPath + instrumento?.imagen}
                className="img-fluid rounded-start"
                alt="..."
              />
              <p />
              <p className="small">
                Descripcion: <p /> {instrumento?.descripcion}
              </p>
            </div>
            <div className="col-md-1 border-end"></div> {/* Barra vertical */}
            <div className="col-md-5">
              <div className="card-body">
                <p className="card-text">
                  <small className="text-body-secondary">
                    {instrumento?.cantidadVendida + " vendidos"}
                  </small>
                </p>
                <p className="card-text descripcion">
                  <small className="text-muted">
                    {instrumento?.instrumento}
                  </small>
                </p>
                <h5 className="card-title titulo">$ {instrumento?.precio}</h5>
                <p className="card-text">
                  <small className="text-muted">
                    Marca: {instrumento?.marca}
                  </small>
                  <br />
                  <small className="text-muted">
                    Modelo: {instrumento?.modelo}
                  </small>
                </p>
                <p className="card-text">
                  <br />
                  <small className="text-muted">Costo Envio:</small>
                  <br />
                  <small className="text-body-primary">
                    {instrumento?.costoEnvio === "G" && (
                      <img src="../../img/camion.png" alt="" />
                    )}
                    <span
                      style={{
                        color:
                          instrumento?.costoEnvio === "G"
                            ? "limegreen"
                            : "darkorange",
                      }}
                    >
                      {instrumento?.costoEnvio === "G"
                        ? "Envío gratis a todo el país"
                        : "Costo de Envío interior de Argentina: $" +
                          instrumento?.costoEnvio}
                    </span>
                  </small>
                </p>
              </div>
            </div>
          </div>
          <a href="/instrumentos">
            <button type="button" className="btn btn-success">
              Volver
            </button>
          </a>
        </div>
      </div>
    </>
  );
}

export default Detail;
