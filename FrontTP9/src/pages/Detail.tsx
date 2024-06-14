import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Instrumento from "../types/Instrumento";
import { getInstrumentoById } from "../services/InstrumentoCRUD";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../context/AuthProvider";
import { generarPdf } from "../services/ReportesCRUD";

function Detail() {
  const imgPath = "src\\assets\\img\\";
  const { id } = useParams();
  const [instrumento, setInstrumento] = useState<Instrumento>();
  const { usuario } = useAuth();

  const getInstrumento = async () => {
    const instrumentoSelect: Instrumento = await getInstrumentoById(String(id));
    setInstrumento(instrumentoSelect);
  };
  useEffect(() => {
    getInstrumento();
  });

  const handleGenerarPDF = async () => {
    try {
      if (instrumento) {
        await generarPdf(instrumento);
      }
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "#eee",
          borderRadius: 8,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <img src={imgPath + instrumento?.imagen} />
        <Typography>
          Descripcion: <p /> {instrumento?.descripcion}
        </Typography>
        <div className="col-md-5">
          <div className="card-body">
            <p className="card-text">
              <small className="text-body-secondary">
                {instrumento?.cantidadVendida + " vendidos"}
              </small>
            </p>
            <p className="card-text descripcion">
              <small className="text-muted">{instrumento?.instrumento}</small>
            </p>
            <h5 className="card-title titulo">$ {instrumento?.precio}</h5>
            <p className="card-text">
              <small className="text-muted">Marca: {instrumento?.marca}</small>
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
          {(usuario?.rol === "Admin" || usuario?.rol === "Operador") && (
            <button className="me-3 btn-generar-pdf" onClick={handleGenerarPDF}>
              Generar PDF
            </button>
          )}
        </div>
        <a href="/instrumentos">
          <button type="button" className="btn btn-success">
            Volver
          </button>
        </a>
      </Box>
    </>
  );
}

export default Detail;
