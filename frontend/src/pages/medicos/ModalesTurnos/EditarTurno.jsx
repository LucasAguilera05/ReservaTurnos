import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import useTurnosStore from "../../../stores/Turnos-Store";

const EditarTurno = ({ turno }) => {
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
    fecha: turno.fecha || "",
    horario: turno.horario || "",
    medicoId: turno.medicoId || "",
    medicoNombre: turno.medicoNombre || "",
    medicoTipo: turno.medicoTipo || "",
    pacienteId: turno.pacienteId || "Ninguno",
    pacienteNombre: turno.pacienteNombre || "Ninguno",
    estado: turno.estado || "Ninguno",
  };

  const handleSubmit = async (values) => {
    const turnoEditado = {
      ...values,
    };

    try {
      await actualizarTurno(turno.id, turnoEditado);
      handleClose(); 

      Swal.fire({
        title: "Turno actualizado",
        text: "El turno se ha actualizado con éxito.",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Algo salió mal al actualizar el turno.",
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
      </Button>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-md">
        <Modal.Header closeButton>
          <Modal.Title>Editar Turno</Modal.Title>
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
                  type="time"
                  name="horario"
                  className={`form-control ${
                    touched.horario && errors.horario ? "is-invalid" : ""
                  }`}
                >
                 
                </Field>
                <ErrorMessage
                  name="horario"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>
              <Form.Group className="col-12 mb-3" controlId="formEstado">
                <Form.Label>Estado</Form.Label>
                <Field
                  as="select"
                  name="estado"
                  className={`form-control ${
                    touched.estado && errors.estado ? "is-invalid" : ""
                  }`}
                >
                  <option value="">Seleccione un estado</option>
                  <option value="Ninguno">Ninguno</option>
                  <option value="Confirmado">Confirmado</option>
                  <option value="Finalizado">Finalizado</option>
                </Field>
                <ErrorMessage
                  name="estado"
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
                Actualizar
              </Button>
            </Modal.Footer>
          </FormikForm>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default EditarTurno;
