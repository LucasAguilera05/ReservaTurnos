import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaTimesCircle } from "react-icons/fa";
import useTurnosStore from "../../../stores/Turnos-Store";

const CancelarMedico = ({ turno }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { actualizarTurno } = useTurnosStore();

  const handleConfirm = async () => {
    const turnoEditado = {
      ...turno,
      estado: "Cancelado",
      canceladoPor: "medico",
    };

    try {
      await actualizarTurno(turno.id, turnoEditado);
      handleClose();

      Swal.fire({
        title: "Turno cancelado",
        text: "El turno fue cancelado y el paciente fue notificado por email.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        customClass: { popup: 'rounded-3' }
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Algo salió mal al cancelar el turno.",
        icon: "error",
        confirmButtonText: "Cerrar",
        customClass: { popup: 'rounded-3' }
      });
    }
  };

  return (
    <>
      <button
        className="turno-action-btn cancel"
        onClick={handleShow}
        title="Cancelar turno"
        style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer' }}
      >
        <FaTimesCircle />
      </button>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-sm" centered>
        <Modal.Header closeButton>
          <Modal.Title>Cancelar Turno</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>¿Está seguro de que desea cancelar este turno?</p>
          <p className="mb-0" style={{ fontSize: '0.9rem', color: '#64748b' }}>
            El paciente <strong>{turno.pacienteNombre}</strong> recibirá una notificación por email.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Confirmar Cancelación
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CancelarMedico;
