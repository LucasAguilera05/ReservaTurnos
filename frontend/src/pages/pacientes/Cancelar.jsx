import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import useTurnosStore from "../../stores/Turnos-Store";
import useAuth from "../../stores/Auth-Store";
import useUsuarios from "../../stores/Usuarios-Store";
import { MdDelete } from "react-icons/md";

const Cancelar = ({ turno }) => {
    const { user } = useAuth(state => ({ user: state.user }));
    const { usuario, getUsuarioById } = useUsuarios(state => ({
      usuario: state.usuario,
      getUsuarioById: state.getUsuarioById
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

  const validationSchema = Yup.object().shape({
    fecha: Yup.string().required("La fecha es obligatorio"),
    horario: Yup.string().required("El horario es obligatorio"),
    medicoId: Yup.string().required("La división es obligatoria"),
    medicoNombre: Yup.string().required("La división es obligatoria"),
    medicoTipo: Yup.string().required("La división es obligatoria"),
    pacienteId: Yup.string().required("La división es obligatoria"),
    pacienteNombre: Yup.string().required("La división es obligatoria"),
    estado: Yup.string().required("La división es obligatoria"),
  });

  const initialValues = {
    fecha: turno.fecha,
    horario: turno.horario,
    medicoId: turno.medicoId,
    medicoNombre: turno.medicoNombre,
    medicoTipo: turno.medicoTipo,
    pacienteId: turno.pacienteId,
    pacienteNombre: turno.pacienteNombre,
  };

  const handleSubmit = async (values) => {
    const turnoEditado = {
      ...turno,
      pacienteId: "Ninguno",
      pacienteNombre: "Ninguno",
      estado: "Ninguno",
    };

    try {
      await actualizarTurno(turno.id, turnoEditado);
      handleClose(); 

      Swal.fire({
        title: "Turno cancelado",
        text: "El turno se ha cancelado con éxito.",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Algo salió mal al cancelar el turno.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <>
      <Button
        onClick={handleShow}
        variant="outline-danger"
        className="m-1 d-flex justify-content-center align-items-center flex-column"
      >
        <MdDelete />Cancelar
      </Button>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-md">
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cancelación de Turno</Modal.Title>
        </Modal.Header>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <FormikForm className="m-1 d-flex justify-content-center align-items-center flex-column">
            
              
              <p>¿Está seguro de cancelar el turno?</p>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="primary" onClick={handleSubmit} >
                Confirmar Cancelacion
              </Button>
            </Modal.Footer>
          </FormikForm>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default Cancelar;
