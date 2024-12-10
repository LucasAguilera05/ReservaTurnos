import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import useTurnosStore from "../../stores/Turnos-Store";
import useAuth from "../../stores/Auth-Store";
import useUsuarios from "../../stores/Usuarios-Store";

const Solicitar = ({ turno }) => {
  const { user } = useAuth((state) => ({ user: state.user }));
  const { getUsuarioById } = useUsuarios((state) => ({
    getUsuarioById: state.getUsuarioById,
  }));

  useEffect(() => {
    if (user?.id) {
      getUsuarioById(user.id);
    }
  }, [user?.id, getUsuarioById]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { actualizarTurno } = useTurnosStore();

  const handleConfirm = async () => {
    const turnoEditado = {
      ...turno,
      pacienteId: user.id,
      pacienteNombre: `${user.nombre} ${user.apellido}`,
      estado: "Confirmado",
    };

    try {
      await actualizarTurno(turno.id, turnoEditado);
      handleClose();

      Swal.fire({
        title: "Turno confirmado",
        text: "El turno se ha confirmado con éxito.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Algo salió mal al confirmar el turno.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <>
      <Button
        onClick={handleShow}
        variant="outline-warning"
        className="m-1 d-flex justify-content-center align-items-center flex-column"
      >
        <FaEdit />
        Solicitar
      </Button>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-md">
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Turno</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>¿Desea confirmar el turno?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Solicitar;
