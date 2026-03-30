import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import * as Yup from "yup";
import useUsuarios from "../../../stores/Usuarios-Store";
import Swal from "sweetalert2";
import { FaSave, FaArrowLeft, FaUserEdit } from "react-icons/fa";
import "./Administrador.css";

const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario, getUsuarioById, updateUsuario, loading } = useUsuarios();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (id) {
      getUsuarioById(id);
    }
  }, [id, getUsuarioById]);

  useEffect(() => {
    if (usuario) {
      // Determinar la data según el perfil
      const isPaciente = usuario.rol.toLowerCase().includes("paciente");
      const isMedico = usuario.rol.toLowerCase().includes("medico") || usuario.rol.toLowerCase().includes("médico");
      const isAdmin = usuario.rol.toLowerCase().includes("admin");

      let profileData = {};
      if (isPaciente && usuario.pacienteData) profileData = usuario.pacienteData;
      if (isMedico && usuario.medicoData) profileData = usuario.medicoData;
      if (isAdmin && usuario.adminData) profileData = usuario.adminData;

      setInitialData({
        email: usuario.email || "",
        rol: usuario.rol || "",
        nombre: profileData.nombre || "",
        apellido: profileData.apellido || "",
        dni: profileData.dni || "",
        telefono: profileData.telefono || "",
        direccion: profileData.direccion || "",
        edad: profileData.edad || "",
        peso: profileData.peso || "",
        altura: profileData.altura || "",
        sexo: profileData.sexo || "",
        especialidad: profileData.especialidad || "",
        historial: profileData.historial || "",
      });
    }
  }, [usuario]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("El email es requerido"),
    nombre: Yup.string().required("El nombre es requerido"),
    apellido: Yup.string().required("El apellido es requerido"),
    dni: Yup.string().required("El DNI es requerido"),
    telefono: Yup.string().required("El teléfono es requerido"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const success = await updateUsuario(id, values);
      
      if (success) {
        Swal.fire({
          title: "Usuario actualizado",
          text: "Los datos del usuario se han guardado exitosamente.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => navigate("/Administrador/PanelAdmin/Usuarios"));
      } else {
        throw new Error("No se pudo actualizar conectando al servidor.");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un error al actualizar el usuario.",
        icon: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !initialData) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </Container>
    );
  }

  const isPaciente = usuario?.rol.toLowerCase().includes("paciente");
  const isMedico = usuario?.rol.toLowerCase().includes("medico") || usuario?.rol.toLowerCase().includes("médico");

  return (
    <Container fluid className="py-4">
      <Card className="shadow-sm border-0 border-radius-lg">
        <Card.Header className="bg-white border-bottom-0 pt-4 pb-0">
          <div className="d-flex align-items-center gap-3">
            <Button variant="light" className="rounded-circle shadow-sm" onClick={() => navigate(-1)}>
              <FaArrowLeft />
            </Button>
            <h3 className="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
              <FaUserEdit className="text-primary" /> Editar Perfil - {usuario.rol}
            </h3>
          </div>
        </Card.Header>
        <Card.Body className="p-4">
          <Formik
            initialValues={initialData}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting, errors, touched }) => (
              <FormikForm>
                <h5 className="mb-3 text-secondary border-bottom pb-2">Datos de la Cuenta</h5>
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Correo Electrónico</Form.Label>
                      <Field name="email" type="email" className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`} />
                      <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Rol Asignado</Form.Label>
                      <Field name="rol" type="text" className="form-control" disabled />
                      <Form.Text className="text-muted">El rol no puede modificarse desde aquí por integridad de datos.</Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <h5 className="mb-3 text-secondary border-bottom pb-2">Información Personal</h5>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Nombre</Form.Label>
                      <Field name="nombre" className={`form-control ${touched.nombre && errors.nombre ? 'is-invalid' : ''}`} />
                      <ErrorMessage name="nombre" component="div" className="invalid-feedback" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Apellido</Form.Label>
                      <Field name="apellido" className={`form-control ${touched.apellido && errors.apellido ? 'is-invalid' : ''}`} />
                      <ErrorMessage name="apellido" component="div" className="invalid-feedback" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">DNI</Form.Label>
                      <Field name="dni" className={`form-control ${touched.dni && errors.dni ? 'is-invalid' : ''}`} />
                      <ErrorMessage name="dni" component="div" className="invalid-feedback" />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Teléfono</Form.Label>
                      <Field name="telefono" className={`form-control ${touched.telefono && errors.telefono ? 'is-invalid' : ''}`} />
                      <ErrorMessage name="telefono" component="div" className="invalid-feedback" />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Dirección</Form.Label>
                      <Field name="direccion" className="form-control" />
                    </Form.Group>
                  </Col>
                </Row>

                {isMedico && (
                  <>
                    <h5 className="mb-3 text-secondary border-bottom pb-2">Datos Médicos</h5>
                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold">Especialidad Principal</Form.Label>
                          <Field name="especialidad" className="form-control" placeholder="Ej. Cardiología" />
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                )}

                {isPaciente && (
                  <>
                    <h5 className="mb-3 text-secondary border-bottom pb-2">Datos Biométricos y Clínicos</h5>
                    <Row className="mb-3">
                      <Col md={3}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold">Edad</Form.Label>
                          <Field name="edad" type="number" className="form-control" />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold">Sexo</Form.Label>
                          <Field as="select" name="sexo" className="form-select">
                            <option value="">Seleccione...</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Otro">Otro</option>
                          </Field>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold">Peso (kg)</Form.Label>
                          <Field name="peso" type="number" className="form-control" />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold">Altura (m)</Form.Label>
                          <Field name="altura" type="number" step="0.01" className="form-control" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col xs={12}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold">Antecedentes / Historial</Form.Label>
                          <Field as="textarea" rows={3} name="historial" className="form-control" />
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                )}

                <div className="d-flex justify-content-end mt-4 pt-3 border-top">
                  <Button variant="secondary" className="me-2 px-4 shadow-sm" onClick={() => navigate(-1)} disabled={isSubmitting}>
                    Cancelar
                  </Button>
                  <Button variant="primary" type="submit" className="px-4 shadow-sm d-flex align-items-center gap-2" disabled={isSubmitting}>
                    <FaSave /> {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                </div>
              </FormikForm>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditarUsuario;
