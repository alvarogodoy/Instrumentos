import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { generarExcel } from "../services/ReportesCRUD";

const GenerarExcelButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [fechaDesde, setFechaDesde] = useState<Date | null>(null);
  const [fechaHasta, setFechaHasta] = useState<Date | null>(null);

  const handleGenerarExcel = async () => {
    try {
      if (!fechaDesde || !fechaHasta) {
        alert("Por favor selecciona ambas fechas");
        return;
      }

      const filtro = {
        fechaDesde: moment(fechaDesde).format("YYYY-MM-DD"),
        fechaHasta: moment(fechaHasta).format("YYYY-MM-DD"),
      };

      // Llamar a la función para generar el reporte Excel
      const arrayBuffer = await generarExcel(filtro);

      // Crear el Blob con el contenido del archivo
      const blob = new Blob([arrayBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Crear un objeto URL para el blob
      const url = window.URL.createObjectURL(blob);

      // Crear un enlace <a> para descargar el archivo
      const a = document.createElement("a");
      a.href = url;
      a.download = "pedidos.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Liberar el objeto URL creado
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generando el reporte Excel:", error);
      alert(
        "Error generando el reporte Excel. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };

  return (
    <>
      <Button
        className="btn-excel"
        variant="primary"
        onClick={() => setShowModal(true)}
      >
        Generar Excel
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Generar Reporte Excel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="formFechaDesde">
              <Form.Label column sm="4">
                Fecha Desde:
              </Form.Label>
              <Col sm="8">
                <DatePicker
                  selected={fechaDesde}
                  onChange={(date) => setFechaDesde(date as Date)}
                  dateFormat="dd/MM/yyyy"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formFechaHasta">
              <Form.Label column sm="4">
                Fecha Hasta:
              </Form.Label>
              <Col sm="8">
                <DatePicker
                  selected={fechaHasta}
                  onChange={(date) => setFechaHasta(date as Date)}
                  dateFormat="dd/MM/yyyy"
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-danger"
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Cancelar
          </Button>
          <Button
            className="btn-excel"
            variant="primary"
            onClick={handleGenerarExcel}
          >
            Generar Excel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GenerarExcelButton;
