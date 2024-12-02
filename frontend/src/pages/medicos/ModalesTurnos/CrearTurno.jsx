import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import useTurnosStore from "../../../stores/Turnos-Store";
import Swal from "sweetalert2";
import { RiFileAddLine } from "react-icons/ri";
import useUsuarios from "../../../stores/Usuarios-Store";
import useAuth from "../../../stores/Auth-Store";

const CrearTurno = (medico) => {
  const { user } = useAuth(state => ({ user: state.user }));
  const { usuario, getUsuarioById } = useUsuarios(state => ({
    usuario: state.usuario,
    getUsuarioById: state.getUsuarioById
  }));
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { crearTurno, verificarTurnoExistente, turnos, obtenerTurnos } =
    useTurnosStore();

  useEffect(() => {
    obtenerTurnos();
    if (user?.id) {
      getUsuarioById(user.id);
    }
  }, [obtenerTurnos, user?.id, getUsuarioById]);

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
    fecha: "",
    horario: "",
    medicoId: `${user?.id}`,
    medicoNombre: `${user?.nombre + ` ` + user?.apellido}`,
    medicoTipo: `${user?.especialidad}`,
    pacienteId: "Ninguno",
    pacienteNombre: "Ninguno",
    estado: "Ninguno",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const existe = await verificarTurnoExistente(
        values.fecha,
        values.horario
      );

      if (existe) {
        Swal.fire({
          title: "Turno duplicado",
          text: "Ya existe un turno con esta fecha y horario.",
          icon: "warning",
          confirmButtonText: "Cerrar",
        });
        return;
      }

      const turnosTurno = turnos
        .filter(
          (turno) =>
            turno.fecha === values.fecha && turno.horario === values.horario
        )
        .map((turno) => turno.id);

      const nuevoTurno = {
        ...values,
      };

      await crearTurno(nuevoTurno);
      handleClose();

      Swal.fire({
        title: "Turno creado",
        text: "El turno se ha creado con éxito.",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });

      resetForm();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Algo salió mal al crear el turno.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <>
      <button
        onClick={handleShow}
        className="my-1 btn-crear d-flex justify-content-center align-items-center"
      >
        <RiFileAddLine className="me-2" />
        Nuevo Turno
      </button>
      <Modal show={show} onHide={handleClose} dialogClassName="modal-md">
        <Modal.Header closeButton>
          <Modal.Title>Crear Turno</Modal.Title>
        </Modal.Header>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <FormikForm>
              <Modal.Body className="row">
                <Form.Group className="col-12 mb-3" controlId="formFecha">
                  <Form.Label>Fecha</Form.Label>
                  <Field
                    type="date"
                    name="fecha"
                    className={`form-control ${
                      touched.fecha && errors.fecha ? "is-invalid" : ""
                    }`}
                  >
                  </Field>
                  <ErrorMessage
                    name="fecha"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Group>
                <Form.Group className="col-12 mb-3" controlId="formHorario">
                  <Form.Label>Horario</Form.Label>
                  <Field
                    as="select"
                    name="horario"
                    className={`form-control ${
                      touched.horario && errors.horario ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">Seleccione un horario</option>
                    <option value="0800">8:00</option>
                    <option value="0900">9:00</option>
                    <option value="1000">10:00</option>
                    <option value="1100">11:00</option>
                  </Field>
                  <ErrorMessage
                    name="horario"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Group>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cerrar
                </Button>
                <Button variant="primary" type="submit">
                  Crear
                </Button>
              </Modal.Footer>
            </FormikForm>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default CrearTurno;
