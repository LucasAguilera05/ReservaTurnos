import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Container, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { useUserStore } from "../../../stores/user-store"; // Asegúrate de importar el store
import Swal from "sweetalert2";

const AdminPanel = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [userType, setUserType] = React.useState(""); // Paciente, Médico o Administrador
  const navigate = useNavigate();
  const createUsuario = useUserStore((state) => state.createUsuario); // Función desde el store

  const handleShowModal = (type) => {
    setUserType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const schemaBase = yup.object().shape({
    dni: yup.string().required("El DNI es requerido"),
    nombre: yup.string().required("El nombre es requerido"),
    apellido: yup.string().required("El apellido es requerido"),
    email: yup.string().email("Debe escribir un email válido").required("El email es requerido"),
    telefono: yup.string().required("El teléfono es requerido"),
    direccion: yup.string().required("La dirección es requerida"),
    password: yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("La contraseña es requerida"),
    passwordConfirm: yup.string()
      .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required("Confirmar la contraseña es requerido"),
    sexo: yup.string().required("El sexo es requerido"),
  });

  // Esquema dinámico de validación
  const getValidationSchema = () => {
    if (userType === "Paciente") {
      return schemaBase.shape({
        edad: yup.number().positive("La edad debe ser positiva").required("La edad es requerida"),
        peso: yup.number().positive("El peso debe ser positivo").required("El peso es requerido"),
      });
    }
    if (userType === "Médico") {
      return schemaBase.shape({
        especialidad: yup.string().required("La especialidad es requerida"),
      });
    }
    return schemaBase; // Para administrador
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const success = await createUsuario(values);
      if (success) {
        Swal.fire({
          title: `${userType} creado exitosamente`,
          text: `${userType} creado exitosamente.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setShowModal(false);
      }
    } catch (error) {
      setErrors({ server: "Error al guardar los datos. Por favor, intente nuevamente." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="my-4">
      <h1 className="text-center">Panel de Administración</h1>
      <div className="d-flex justify-content-center my-4">
        <Button variant="primary" onClick={() => handleShowModal("Paciente")} className="mx-2">
          Crear Paciente
        </Button>
        <Button variant="success" onClick={() => handleShowModal("Médico")} className="mx-2">
          Crear Médico
        </Button>
        <Button variant="warning" onClick={() => handleShowModal("Administrador")} className="mx-2">
          Crear Administrador
        </Button>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear {userType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={getValidationSchema()}
            onSubmit={handleSubmit}
            initialValues={{
              dni: "",
              nombre: "",
              apellido: "",
              email: "",
              telefono: "",
              direccion: "",
              password: "",
              passwordConfirm: "",
              sexo: "",
              especialidad: "",
              edad: "",
              peso: "",
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              errors,
              isSubmitting,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                {/* Formulario común */}
                <Form.Group className="mb-3" controlId="formDNI">
                  <Form.Label>DNI</Form.Label>
                  <Form.Control
                    type="text"
                    name="dni"
                    value={values.dni}
                    onChange={handleChange}
                    isInvalid={touched.dni && !!errors.dni}
                    isValid={touched.dni && !errors.dni}
                  />
                  <Form.Control.Feedback type="invalid">{errors.dni}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formNombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={values.nombre}
                    onChange={handleChange}
                    isInvalid={touched.nombre && !!errors.nombre}
                    isValid={touched.nombre && !errors.nombre}
                  />
                  <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formApellido">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    name="apellido"
                    value={values.apellido}
                    onChange={handleChange}
                    isInvalid={touched.apellido && !!errors.apellido}
                    isValid={touched.apellido && !errors.apellido}
                  />
                  <Form.Control.Feedback type="invalid">{errors.apellido}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && !!errors.email}
                    isValid={touched.email && !errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTelefono">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    name="telefono"
                    value={values.telefono}
                    onChange={handleChange}
                    isInvalid={touched.telefono && !!errors.telefono}
                    isValid={touched.telefono && !errors.telefono}
                  />
                  <Form.Control.Feedback type="invalid">{errors.telefono}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDireccion">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={values.direccion}
                    onChange={handleChange}
                    isInvalid={touched.direccion && !!errors.direccion}
                    isValid={touched.direccion && !errors.direccion}
                  />
                  <Form.Control.Feedback type="invalid">{errors.direccion}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSexo">
                  <Form.Label>Sexo</Form.Label>
                  <Form.Control
                    as="select"
                    name="sexo"
                    value={values.sexo}
                    onChange={handleChange}
                    isInvalid={touched.sexo && !!errors.sexo}
                    isValid={touched.sexo && !errors.sexo}
                  >
                    <option value="">Seleccione...</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">{errors.sexo}</Form.Control.Feedback>
                </Form.Group>

                {/* Campos específicos según el tipo de usuario */}
                {userType === "Paciente" && (
                  <>
                    <Form.Group className="mb-3" controlId="formEdad">
                      <Form.Label>Edad</Form.Label>
                      <Form.Control
                        type="number"
                        name="edad"
                        value={values.edad}
                        onChange={handleChange}
                        isInvalid={touched.edad && !!errors.edad}
                        isValid={touched.edad && !errors.edad}
                      />
                      <Form.Control.Feedback type="invalid">{errors.edad}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPeso">
                      <Form.Label>Peso</Form.Label>
                      <Form.Control
                        type="number"
                        name="peso"
                        value={values.peso}
                        onChange={handleChange}
                        isInvalid={touched.peso && !!errors.peso}
                        isValid={touched.peso && !errors.peso}
                      />
                      <Form.Control.Feedback type="invalid">{errors.peso}</Form.Control.Feedback>
                    </Form.Group>
                  </>
                )}

                {userType === "Médico" && (
                  <Form.Group className="mb-3" controlId="formEspecialidad">
                    <Form.Label>Especialidad</Form.Label>
                    <Form.Control
                      type="text"
                      name="especialidad"
                      value={values.especialidad}
                      onChange={handleChange}
                      isInvalid={touched.especialidad && !!errors.especialidad}
                      isValid={touched.especialidad && !errors.especialidad}
                    />
                    <Form.Control.Feedback type="invalid">{errors.especialidad}</Form.Control.Feedback>
                  </Form.Group>
                )}

                {/* Confirmar contraseña */}
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={touched.password && !!errors.password}
                    isValid={touched.password && !errors.password}
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPasswordConfirm">
                  <Form.Label>Confirmar Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="passwordConfirm"
                    value={values.passwordConfirm}
                    onChange={handleChange}
                    isInvalid={touched.passwordConfirm && !!errors.passwordConfirm}
                    isValid={touched.passwordConfirm && !errors.passwordConfirm}
                  />
                  <Form.Control.Feedback type="invalid">{errors.passwordConfirm}</Form.Control.Feedback>
                </Form.Group>

                {/* Error general */}
                {errors.server && <div className="text-danger">{errors.server}</div>}

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Guardando..." : "Guardar"}
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminPanel;
