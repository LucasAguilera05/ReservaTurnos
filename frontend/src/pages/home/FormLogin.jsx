import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import useAuth from "../../stores/Auth-Store";
import Swal from "sweetalert2";
import "./Home.css";
import logo from "../../assets/logo1.png";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Debe escribir un email valido")
    .required("El email es requerido"),
  password: yup.string().required("La contrasena es requerida"),
});

// Icons as components
const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
    <line x1="2" x2="22" y1="2" y2="22"/>
  </svg>
);

const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" x2="12" y1="8" y2="12"/>
    <line x1="12" x2="12.01" y1="16" y2="16"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2v4"/>
    <path d="M16 2v4"/>
    <rect width="18" height="18" x="3" y="4" rx="2"/>
    <path d="M3 10h18"/>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const FormLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (data, { setSubmitting, setErrors }) => {
    try {
      const user = await login(data); 
      sessionStorage.setItem("usuario", JSON.stringify(user));
      
      Swal.fire({
        title: "Inicio de sesion exitoso",
        text: "Redirigiendo...",
        icon: "success",
        timer: 1000, 
        showConfirmButton: false, 
        willClose: () => {
          if (user.rol === "Paciente" || user.rol === "paciente") {
            navigate("/pacientes/perfil");
          } else if (user.rol === "Medico" || user.rol === "medico" || user.rol === "Medico" || user.rol === "medico") {
            navigate("/medicos/perfil");
          }
          else if (user.rol === "Administrador" || user.rol === "administrador") {
            navigate("/Administrador/PanelAdmin");
        }
      }
      });

    } catch (error) {
      setErrors({ server: "Credenciales incorrectas. Por favor, verifica tu email y contrasena." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      {/* Left Panel - Info */}
      <div className="login-info-panel">
        <div className="login-info-content">
          <h1>Sistema de Gestion de Citas</h1>
          <p>
            Gestiona tus citas medicas de forma rapida, segura y eficiente. 
            Accede a tu historial y programa nuevas consultas en segundos.
          </p>
          
          <div className="login-features">
            <div className="login-feature">
              <div className="login-feature-icon">
                <CalendarIcon />
              </div>
              <div className="login-feature-text">
                <h4>Agenda Inteligente</h4>
                <p>Reserva turnos disponibles en tiempo real</p>
              </div>
            </div>
            
            <div className="login-feature">
              <div className="login-feature-icon">
                <UsersIcon />
              </div>
              <div className="login-feature-text">
                <h4>Gestion de Pacientes</h4>
                <p>Historial completo y seguimiento personalizado</p>
              </div>
            </div>
            
            <div className="login-feature">
              <div className="login-feature-icon">
                <ClockIcon />
              </div>
              <div className="login-feature-text">
                <h4>Ahorra Tiempo</h4>
                <p>Sin esperas, sin llamadas telefonicas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="login-form-panel">
        <div className="login-form-container">
          <div className="login-form-header">
            <img src={logo} alt="SGC Logo" className="login-logo" />
            <h2>Bienvenido de nuevo</h2>
            <p>Ingresa tus credenciales para continuar</p>
          </div>

          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              email: "",
              password: "",
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
              <Form noValidate onSubmit={handleSubmit} className="login-form">
                {errors.server && (
                  <div className="login-error">
                    <AlertIcon />
                    {errors.server}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Correo electronico</label>
                  <div className="login-input-wrapper">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="tu@email.com"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={touched.email && !!errors.email}
                      isValid={touched.email && !errors.email && values.email}
                    />
                    <span className="login-input-icon">
                      <EmailIcon />
                    </span>
                  </div>
                  {touched.email && errors.email && (
                    <div className="invalid-feedback d-block">
                      <AlertIcon /> {errors.email}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Contrasena</label>
                  <div className="login-input-wrapper">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Ingresa tu contrasena"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={touched.password && !!errors.password}
                      isValid={touched.password && !errors.password && values.password}
                    />
                    <span className="login-input-icon">
                      <LockIcon />
                    </span>
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  {touched.password && errors.password && (
                    <div className="invalid-feedback d-block">
                      <AlertIcon /> {errors.password}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="login-btn login-btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="login-spinner"></span>
                      Iniciando sesion...
                    </>
                  ) : (
                    <>
                      Ingresar
                      <ArrowRightIcon />
                    </>
                  )}
                </button>

                <div className="login-divider">
                  <span className="login-divider-line"></span>
                  <span className="login-divider-text">o</span>
                  <span className="login-divider-line"></span>
                </div>

                <button
                  type="button"
                  className="login-btn login-btn-secondary"
                  onClick={() => navigate('/SignUp')}
                >
                  Crear una cuenta nueva
                </button>
              </Form>
            )}
          </Formik>

          <div className="login-footer">
            <p>Grupo 1 - Diseno de Sistemas 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
