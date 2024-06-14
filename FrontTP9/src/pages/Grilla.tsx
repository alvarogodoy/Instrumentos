import { useState, useEffect } from "react";
import Instrumento from "../types/Instrumento";
import {
  getInstrumentos,
  updateInstrumento,
} from "../services/InstrumentoCRUD";
import {
  TableContainer,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  Button,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import BotonExcel from "../components/BotonExcel";

function Grilla() {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState<string>("");
  const { usuario } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const instrumentosData: Instrumento[] = await getInstrumentos();
      const categoriasData: string[] = getCategorias(instrumentosData);
      setInstrumentos(instrumentosData);
      setCategorias(categoriasData);
    }
    fetchData();
  }, []);

  const getCategorias = (instrumentos: Instrumento[]): string[] => {
    const categoriasUnicas = new Set<string>();
    instrumentos.forEach((instrumento) => {
      if (instrumento.categoria) {
        categoriasUnicas.add(instrumento.categoria.denominacion);
      }
    });
    return Array.from(categoriasUnicas);
  };

  const handleCategoriaChange = (e: SelectChangeEvent) => {
    setFiltroCategoria(e.target.value);
  };

  const eliminarInstrumento = async (instrumento: Instrumento) => {
    try {
      instrumento.eliminado = true;
      await updateInstrumento(instrumento);
      setInstrumentos(instrumentos.filter((ins) => ins.id !== instrumento.id));
    } catch (error) {
      console.error("Error al eliminar el instrumento:", error);
    }
  };

  const handleCreate = () => {
    navigate("/form/0");
  };

  const instrumentosFiltrados = filtroCategoria
    ? instrumentos.filter(
        (instrumento) =>
          instrumento.categoria &&
          instrumento.categoria.denominacion === filtroCategoria
      )
    : instrumentos;

  return (
    <>
      {usuario?.rol == "Admin" ? (
        <>
          <Button onClick={handleCreate}>Nuevo</Button>
          <BotonExcel />
        </>
      ) : null}

      <Select
        value={filtroCategoria}
        onChange={handleCategoriaChange}
        size="small"
      >
        <MenuItem value="">Todas las categorías</MenuItem>
        {categorias.map((categoria, index) => (
          <MenuItem key={index} value={categoria}>
            {categoria}
          </MenuItem>
        ))}
      </Select>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Instrumento</TableCell>
              <TableCell align="right">Marca</TableCell>
              <TableCell align="right">Modelo</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="right">Costo de Envio</TableCell>
              <TableCell align="right">Vendidos</TableCell>
              {usuario?.rol == "Admin" ? (
                <TableCell align="right">Operaciones</TableCell>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {instrumentosFiltrados.map((instrumento: Instrumento, index) => (
              <TableRow key={index}>
                <TableCell align="right">{instrumento.id}</TableCell>
                <TableCell align="right">{instrumento.instrumento}</TableCell>
                <TableCell align="right">{instrumento.marca}</TableCell>
                <TableCell align="right">{instrumento.modelo}</TableCell>
                <TableCell align="right">{instrumento.precio}</TableCell>
                <TableCell align="right">{instrumento.costoEnvio}</TableCell>
                <TableCell align="right">
                  {instrumento.cantidadVendida}
                </TableCell>
                {usuario?.rol == "Admin" ? (
                  <TableCell align="right">
                    <Button onClick={() => eliminarInstrumento(instrumento)}>
                      Eliminar
                    </Button>
                    <Button>Editar</Button>
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Grilla;
