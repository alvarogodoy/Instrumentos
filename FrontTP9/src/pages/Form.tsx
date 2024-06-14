import { useState, useEffect } from "react";
import Instrumento from "../types/Instrumento";
import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../types/Categoria";
import {
  createInstrumento,
  getInstrumentoById,
  updateInstrumento,
} from "../services/InstrumentoCRUD";
import { getCategorias } from "../services/CategoriaCRUD";
import { Box, Button, Grid, TextField } from "@mui/material";

function Form() {
  const navigate = useNavigate();
  const { id } = useParams();

  function getRandomIntInRange(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const [instrumento, setInstrumento] = useState<Instrumento>(
    new Instrumento()
  );
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [txtValidacion, setTxtValidacion] = useState<string>("");

  useEffect(() => {
    async function cargarInstrumento() {
      if (id) {
        const instrumentoCargado = await getInstrumentoById(id);
        setInstrumento(instrumentoCargado);
      } else {
        setInstrumento(new Instrumento());
      }
    }
    cargarInstrumento();
  }, []);

  useEffect(() => {
    async function cargarCategorias() {
      try {
        const categorias = await getCategorias();
        setCategorias(categorias);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
        setTxtValidacion(
          "Error al obtener las categorías. Por favor, inténtelo de nuevo más tarde."
        );
      }
    }
    cargarCategorias();
  }, []);

  const guardarInstrumento = async () => {
    if (!instrumento.instrumento || instrumento.instrumento.trim() === "") {
      setTxtValidacion("Ingrese el nombre del instrumento");
      return;
    }
    if (!instrumento.marca || instrumento.marca.trim() === "") {
      setTxtValidacion("Ingrese la marca del instrumento");
      return;
    }
    if (!instrumento.modelo || instrumento.modelo.trim() === "") {
      setTxtValidacion("Ingrese el modelo del instrumento");
      return;
    }
    if (!instrumento.imagen || instrumento.imagen.trim() === "") {
      setTxtValidacion("Ingrese la imagen del instrumento");
      return;
    }
    if (!instrumento.precio || instrumento.precio <= 0) {
      setTxtValidacion("Ingrese un precio válido");
      return;
    }
    if (!instrumento.costoEnvio || instrumento.costoEnvio.trim() === "") {
      setTxtValidacion("Ingrese el costo de envío del instrumento");
      return;
    }
    if (!instrumento.cantidadVendida && instrumento.cantidadVendida < 0) {
      setTxtValidacion("Ingrese una cantidad vendida válida");
      return;
    }
    if (!instrumento.descripcion || instrumento.descripcion.trim() === "") {
      setTxtValidacion("Ingrese la descripción del instrumento");
      return;
    }
    if (!instrumento.categoria || !instrumento.categoria.id) {
      setTxtValidacion("Seleccione una categoría para el instrumento");
      return;
    }

    try {
      if (instrumento && instrumento.id) {
        await updateInstrumento(instrumento);
      } else {
        instrumento.id = `${getRandomIntInRange(11, 500)}`;
        await createInstrumento(instrumento);
      }
      navigate("/grilla");
    } catch (error) {
      console.error("Error al guardar el instrumento:", error);
      setTxtValidacion(
        "Error al guardar el instrumento. Por favor, inténtelo de nuevo más tarde."
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "#eee",
          width: "70%",
          borderRadius: 8,
          padding: 2,
          height: "100vh",
        }}
      >
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                name="name"
                label="Nombre"
                placeholder="Ingrese el nombre"
                value={instrumento.instrumento || ""}
                onChange={(e) =>
                  setInstrumento({
                    ...instrumento,
                    instrumento: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="marca"
                label="Marca"
                placeholder="Ingrese la marca"
                value={instrumento.marca || ""}
                onChange={(e) =>
                  setInstrumento({ ...instrumento, marca: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="modelo"
                label="Modelo"
                placeholder="Ingrese el modelo"
                value={instrumento.modelo || ""}
                onChange={(e) =>
                  setInstrumento({ ...instrumento, modelo: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                type="number"
                name="precio"
                label="Precio"
                placeholder="Ingrese el precio"
                value={instrumento.precio || 0}
                onChange={(e) =>
                  setInstrumento({
                    ...instrumento,
                    precio: parseFloat(e.target.value),
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="costoEnvio"
                label="Costo de Envio"
                placeholder="Ingrese el costo de envío"
                value={instrumento.costoEnvio || ""}
                onChange={(e) =>
                  setInstrumento({ ...instrumento, costoEnvio: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                type="number"
                name="cantidadVendida"
                label="Cantidad Vendida"
                placeholder="Ingrese la cantidad vendida"
                value={instrumento.cantidadVendida || 0}
                onChange={(e) =>
                  setInstrumento({
                    ...instrumento,
                    cantidadVendida: parseFloat(e.target.value),
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                name="txtDescripcion"
                label="Descripcion"
                placeholder="Ingrese la descripción"
                multiline
                value={instrumento.descripcion || ""}
                onChange={(e) =>
                  setInstrumento({
                    ...instrumento,
                    descripcion: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <select
                id="cmbCategoria"
                className="form-select"
                value={instrumento.categoria ? instrumento.categoria.id : ""}
                onChange={(e) =>
                  setInstrumento({
                    ...instrumento,
                    categoria: {
                      id: parseInt(e.target.value),
                      denominacion: "",
                    },
                  })
                }
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.denominacion}
                  </option>
                ))}
              </select>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="txtImagen"
                label="Imagen"
                placeholder="Ingrese la URL de la imagen"
                value={instrumento.imagen || ""}
                onChange={(e) =>
                  setInstrumento({ ...instrumento, imagen: e.target.value })
                }
              />
            </Grid>
            <div>
              <p style={{ color: "red", lineHeight: 5, padding: 5 }}>
                {txtValidacion}
              </p>
            </div>
            <Grid item xs={12}>
              <Box>
                <Button
                  onClick={guardarInstrumento}
                  className="btn btn-success"
                  type="button"
                >
                  Guardar
                </Button>
                <a href={`/grilla`} style={{ marginLeft: 25 }}>
                  <Button variant="contained">Volver</Button>
                </a>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}

export default Form;
