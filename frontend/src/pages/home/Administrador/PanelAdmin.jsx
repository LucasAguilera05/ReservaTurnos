import React, { useEffect, useState } from "react";
import { Modal, Button, Container, Form, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { useUserStore } from "../../../stores/user-store";
import useUsuarios from "../../../stores/Usuarios-Store";
import Swal from "sweetalert2";
import { FaUserPlus, FaUserMd, FaUserShield, FaUsers, FaCalendarCheck, FaHospitalUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdPersonAdd } from "react-icons/md";
import "./Administrador.css";

const AdminPanel = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [userType, setUserType] = React.useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const createUsuario = useUserStore((state) => state.createUsuario);
  
  const { usuarios, getUsuarios } = useUsuarios((state) => ({
    usuarios: state.usuarios || [],
    getUsuarios: state.getUsuarios
  }));

  useEffect(() => {
    getUsuarios();
  }, [getUsuarios]);

  const stats = {
    totalUsuarios: usuarios.length,
    pacientes: usuarios.filter(u => u.rol === "Paciente").length,
    medicos: usuarios.filter(u => u.rol === "Medico").length,
    administradores: usuarios.filter(u => u.rol === "Administrador" || u.rol === "administrador").length
  };

  const handleShowModal = (type) => {
    setUserType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const schemaBase = yup.object().shape({
    dni: yup.string().required("El DNI es requerido"),
    nombre: yup.string().required("El nombre es requerido"),
    apellido: yup.string().required("El apellido es requerido"),
    email: yup.string().email("Email invalido").required("El email es requerido"),
    telefono: yup.string().required("El telefono es requerido"),
    direccion: yup.string().required("La direccion es requerida"),
    password: yup.string().min(6, "Minimo 6 caracteres").required("La contrasena es requerida"),
    passwordConfirm: yup.string()
      .oneOf([yup.ref("password"), null], "Las contrasenas deben coincidir")
      .required("Confirmar contrasena es requerido"),
    sexo: yup.string().required("El sexo es requerido"),
  });

  const getValidationSchema = () => {
    if (userType === "Paciente") {
      return schemaBase.shape({
        edad: yup.number().positive("Debe ser positiva").required("La edad es requerida"),
        peso: yup.number().positive("Debe ser positivo").required("El peso es requerido"),
      });
    }
    if (userType === "Medico") {
      return schemaBase.shape({
        especialidad: yup.string().required("La especialidad es requerida"),
      });
    }
    return schemaBase;
  };

  const handleSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    try {
      const payload = { ...values, rol: userType };
      const success = await createUsuario(payload);
      if (success) {
        Swal.fire({
          title: "Usuario creado",
          text: `${userType} registrado exitosamente`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          background: "#fff",
          customClass: { popup: 'rounded-3' }
        });
        resetForm();
        handleCloseModal();
        getUsuarios();
      }
    } catch (error) {
      setErrors({ server: "Error al guardar. Intente nuevamente." });
    } finally {
      setSubmitting(false);
    }
  };

  const getUserTypeIcon = () => {
    switch(userType) {
      case "Paciente": return <FaHospitalUser className="me-2" />;
      case "Medico": return <FaUserMd className="me-2" />;
      default: return <FaUserShield className="me-2" />;
    }
  };

  const getUserTypeColor = () => {
    switch(userType) {
      case "Paciente": return "var(--color-primarioDos)";
      case "Medico": return "var(--color-accent)";
      default: return "var(--color-warning)";
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Panel de Administracion</h1>
        <p className="page-subtitle">Gestiona usuarios y visualiza estadisticas del sistema</p>
      </div>

      {/* Stats Cards */}
      <Row className="g-4 mb-4">
        <Col xs={6} lg={3}>
          <div className="stat-card animate-fadeInUp">
            <div className="stat-card-icon primary">
              <FaUsers />
            </div>
            <div className="stat-card-value">{stats.totalUsuarios}</div>
            <div className="stat-card-label">Total Usuarios</div>
          </div>
        </Col>
        <Col xs={6} lg={3}>
          <div className="stat-card animate-fadeInUp animate-delay-1">
            <div className="stat-card-icon secondary">
              <FaHospitalUser />
            </div>
            <div className="stat-card-value">{stats.pacientes}</div>
            <div className="stat-card-label">Pacientes</div>
          </div>
        </Col>
        <Col xs={6} lg={3}>
          <div className="stat-card animate-fadeInUp animate-delay-2">
            <div className="stat-card-icon primary">
              <FaUserMd />
            </div>
            <div className="stat-card-value">{stats.medicos}</div>
            <div className="stat-card-label">Medicos</div>
          </div>
        </Col>
        <Col xs={6} lg={3}>
          <div className="stat-card animate-fadeInUp animate-delay-3">
            <div className="stat-card-icon warning">
              <FaUserShield />
            </div>
            <div className="stat-card-value">{stats.administradores}</div>
            <div className="stat-card-label">Administradores</div>
          </div>
        </Col>
      </Row>

      {/* Quick Actions */}
      <div className="card-modern p-4 mb-4">
        <h5 className="fw-bold mb-4">Acciones Rapidas</h5>
        <Row className="g-3">
          <Col xs={12} md={4}>
            <button 
              className="quick-action-btn paciente w-100"
              onClick={() => handleShowModal("Paciente")}
            >
              <div className="quick-action-icon">
                <FaHospitalUser />
              </div>
              <div className="quick-action-content">
                <span className="quick-action-title">Crear Paciente</span>
                <span className="quick-action-desc">Registrar nuevo paciente</span>
              </div>
              <MdPersonAdd className="quick-action-arrow" />
            </button>
          </Col>
          <Col xs={12} md={4}>
            <button 
              className="quick-action-btn medico w-100"
              onClick={() => handleShowModal("Medico")}
            >
              <div className="quick-action-icon">
                <FaUserMd />
              </div>
              <div className="quick-action-content">
                <span className="quick-action-title">Crear Medico</span>
                <span className="quick-action-desc">Registrar nuevo medico</span>
              </div>
              <MdPersonAdd className="quick-action-arrow" />
            </button>
          </Col>
          <Col xs={12} md={4}>
            <button 
              className="quick-action-btn admin w-100"
              onClick={() => handleShowModal("Administrador")}
            >
              <div className="quick-action-icon">
                <FaUserShield />
              </div>
              <div className="quick-action-content">
                <span className="quick-action-title">Crear Admin</span>
                <span className="quick-action-desc">Registrar administrador</span>
              </div>
              <MdPersonAdd className="quick-action-arrow" />
            </button>
          </Col>
        </Row>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg" className="modern-modal">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="d-flex align-items-center fw-bold" style={{ color: getUserTypeColor() }}>
            {getUserTypeIcon()}
            Crear {userType}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-3">
          <Formik
            validationSchema={getValidationSchema()}
            onSubmit={handleSubmit}
            initialValues={{
              dni: "", nombre: "", apellido: "", email: "",
              telefono: "", direccion: "", password: "", passwordConfirm: "",
              sexo: "", especialidad: "", edad: "", peso: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="form-label-modern">DNI</Form.Label>
                      <Form.Control
                        className="form-control-modern"
                        type="text"
                        name="dni"
                        value={values.dni}
                        onChange={handleChange}
                        isInvalid={touched.dni && !!errors.dni}
                        placeholder="Ingrese DNI"
                      />
                      <Form.Control.Feedback type="invalid">{errors.dni}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="form-label-modern">Email</Form.Label>
                      <Form.Control
                        className="form-control-modern"
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={touched.email && !!errors.email}
                        placeholder="ejemplo@correo.com"
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="form-label-modern">Nombre</Form.Label>
                      <Form.Control
                        className="form-control-modern"
                        type="text"
                        name="nombre"
                        value={values.nombre}
                        onChange={handleChange}
                        isInvalid={touched.nombre && !!errors.nombre}
                        placeholder="Nombre"
                      />
                      <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="form-label-modern">Apellido</Form.Label>
                      <Form.Control
                        className="form-control-modern"
                        type="text"
                        name="apellido"
                        value={values.apellido}
                        onChange={handleChange}
                        isInvalid={touched.apellido && !!errors.apellido}
                        placeholder="Apellido"
                      />
                      <Form.Control.Feedback type="invalid">{errors.apellido}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="form-label-modern">Telefono</Form.Label>
                      <Form.Control
                        className="form-control-modern"
                        type="text"
                        name="telefono"
                        value={values.telefono}
                        onChange={handleChange}
                        isInvalid={touched.telefono && !!errors.telefono}
                        placeholder="Numero de telefono"
                      />
                      <Form.Control.Feedback type="invalid">{errors.telefono}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="form-label-modern">Sexo</Form.Label>
                      <Form.Select
                        className="form-control-modern"
                        name="sexo"
                        value={values.sexo}
                        onChange={handleChange}
                        isInvalid={touched.sexo && !!errors.sexo}
                      >
                        <option value="">Seleccione...</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.sexo}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label className="form-label-modern">Direccion</Form.Label>
                      <Form.Control
                        className="form-control-modern"
                        type="text"
                        name="direccion"
                        value={values.direccion}
                        onChange={handleChange}
                        isInvalid={touched.direccion && !!errors.direccion}
                        placeholder="Direccion completa"
                      />
                      <Form.Control.Feedback type="invalid">{errors.direccion}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  {userType === "Paciente" && (
                    <>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="form-label-modern">Edad</Form.Label>
                          <Form.Control
                            className="form-control-modern"
                            type="number"
                            name="edad"
                            value={values.edad}
                            onChange={handleChange}
                            isInvalid={touched.edad && !!errors.edad}
                            placeholder="Edad en anos"
                          />
                          <Form.Control.Feedback type="invalid">{errors.edad}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="form-label-modern">Peso (kg)</Form.Label>
                          <Form.Control
                            className="form-control-modern"
                            type="number"
                            name="peso"
                            value={values.peso}
                            onChange={handleChange}
                            isInvalid={touched.peso && !!errors.peso}
                            placeholder="Peso en kg"
                          />
                          <Form.Control.Feedback type="invalid">{errors.peso}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </>
                  )}

                  {userType === "Medico" && (
                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label className="form-label-modern">Especialidad</Form.Label>
                        <Form.Control
                          className="form-control-modern"
                          type="text"
                          name="especialidad"
                          value={values.especialidad}
                          onChange={handleChange}
                          isInvalid={touched.especialidad && !!errors.especialidad}
                          placeholder="Ej: Cardiologia, Pediatria..."
                        />
                        <Form.Control.Feedback type="invalid">{errors.especialidad}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  )}

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="form-label-modern">Contrasena</Form.Label>
                      <div className="position-relative">
                        <Form.Control
                          className="form-control-modern pe-5"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          isInvalid={touched.password && !!errors.password}
                          placeholder="Minimo 6 caracteres"
                        />
                        <button 
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="form-label-modern">Confirmar Contrasena</Form.Label>
                      <div className="position-relative">
                        <Form.Control
                          className="form-control-modern pe-5"
                          type={showConfirmPassword ? "text" : "password"}
                          name="passwordConfirm"
                          value={values.passwordConfirm}
                          onChange={handleChange}
                          isInvalid={touched.passwordConfirm && !!errors.passwordConfirm}
                          placeholder="Repetir contrasena"
                        />
                        <button 
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <Form.Control.Feedback type="invalid">{errors.passwordConfirm}</Form.Control.Feedback>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                {errors.server && (
                  <div className="alert alert-danger mt-3 mb-0">{errors.server}</div>
                )}

                <div className="d-flex gap-3 mt-4 pt-3 border-top">
                  <Button 
                    variant="light" 
                    onClick={handleCloseModal}
                    className="flex-fill py-2 fw-semibold"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-primary-modern flex-fill py-2"
                    style={{ background: getUserTypeColor(), border: 'none' }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Guardando...
                      </>
                    ) : (
                      <>
                        <FaUserPlus className="me-2" />
                        Crear {userType}
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminPanel;
