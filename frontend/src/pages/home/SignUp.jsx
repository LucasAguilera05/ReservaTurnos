import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { useUserStore } from "../../stores/user-store";
import Swal from "sweetalert2";
import "./SignUp.css"; // Asegúrate de crear este archivo para los estilos específicos

const schema = yup.object().shape({
  dni: yup.string().required("El DNI es requerido"),
  nombre: yup.string().required("El nombre es requerido"),
  apellido: yup.string().required("El apellido es requerido"),
  edad: yup.number().positive("La edad debe ser un número positivo").required("La edad es requerida"),
  email: yup.string().email("Debe escribir un email válido").required("El email es requerido"),
  telefono: yup.string().required("El teléfono es requerido"),
  direccion: yup.string().required("La dirección es requerida"),
  password: yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("La contraseña es requerida"),
  passwordConfirm: yup.string()
    .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("Confirmar la contraseña es requerido"),

});


const SignUp = () => {
  const navigate = useNavigate();
  const createUsuario = useUserStore((state) => state.createUsuario);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const success = await createUsuario(values);
      if (success) {
        Swal.fire({
          title: "Registro exitoso",
          text: "Tu cuenta ha sido creada. Serás redirigido al login.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      setErrors({ server: "Error al crear la cuenta. Por favor, intente nuevamente." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <h2 className="mt-4 mb-4 text-center tituloForm">Crear una cuenta</h2>

      <Formik
  validationSchema={schema}
  onSubmit={handleSubmit}
  initialValues={{
    dni: "",
    nombre: "",
    apellido: "",
    edad: "",
    email: "",
    telefono: "",
    direccion: "",
    password: "",
    passwordConfirm: "",
    
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
          <Form noValidate onSubmit={handleSubmit} className="formularioSignUp">
            <Form.Group className="mb-3" controlId="formDNI">
              <Form.Label className="tituloSecundario">DNI</Form.Label>
              <Form.Control
                type="text"
                name="dni"
                placeholder="Ingrese su DNI"
                value={values.dni}
                onChange={handleChange}
                isInvalid={touched.dni && !!errors.dni}
                isValid={touched.dni && !errors.dni}
                className="border border-dark"
              />
              <Form.Control.Feedback type="invalid">
                {errors.dni}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNombre">
              <Form.Label className="tituloSecundario">Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                placeholder="Ingrese su nombre"
                value={values.nombre}
                onChange={handleChange}
                isInvalid={touched.nombre && !!errors.nombre}
                isValid={touched.nombre && !errors.nombre}
                className="border border-dark"
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombre}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formApellido">
              <Form.Label className="tituloSecundario">Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                placeholder="Ingrese su apellido"
                value={values.apellido}
                onChange={handleChange}
                isInvalid={touched.apellido && !!errors.apellido}
                isValid={touched.apellido && !errors.apellido}
                className="border border-dark"
              />
              <Form.Control.Feedback type="invalid">
                {errors.apellido}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEdad">
              <Form.Label className="tituloSecundario">Edad</Form.Label>
              <Form.Control
                type="number"
                name="edad"
                placeholder="Ingrese su edad"
                value={values.edad}
                onChange={handleChange}
                isInvalid={touched.edad && !!errors.edad}
                isValid={touched.edad && !errors.edad}
                className="border border-dark"
              />
              <Form.Control.Feedback type="invalid">
                {errors.edad}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className="tituloSecundario">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Ingrese su email"
                value={values.email}
                onChange={handleChange}
                isInvalid={touched.email && !!errors.email}
                isValid={touched.email && !errors.email}
                className="border border-dark"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTelefono">
              <Form.Label className="tituloSecundario">Teléfono</Form.Label>
              <Form.Control
                type="tel"
                name="telefono"
                placeholder="Ingrese su teléfono"
                value={values.telefono}
                onChange={handleChange}
                isInvalid={touched.telefono && !!errors.telefono}
                isValid={touched.telefono && !errors.telefono}
                className="border border-dark"
              />
              <Form.Control.Feedback type="invalid">
                {errors.telefono}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDireccion">
              <Form.Label className="tituloSecundario">Dirección</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                placeholder="Ingrese su dirección"
                value={values.direccion}
                onChange={handleChange}
                isInvalid={touched.direccion && !!errors.direccion}
                isValid={touched.direccion && !errors.direccion}
                className="border border-dark"
              />
              <Form.Control.Feedback type="invalid">
                {errors.direccion}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formpassword">
              <Form.Label className="tituloSecundario">password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Ingrese su password"
                value={values.password}
                onChange={handleChange}
                isInvalid={touched.password && !!errors.password}
                isValid={touched.password && !errors.password}
                className="border border-dark"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formpasswordConfirm">
              <Form.Label className="tituloSecundario">Confirmar password</Form.Label>
              <Form.Control
                type="password"
                name="passwordConfirm"
                placeholder="Confirme su password"
                value={values.passwordConfirm}
                onChange={handleChange}
                isInvalid={touched.passwordConfirm && !!errors.passwordConfirm}
                isValid={touched.passwordConfirm && !errors.passwordConfirm}
                className="border border-dark"
              />
              <Form.Control.Feedback type="invalid">
                {errors.passwordConfirm}
              </Form.Control.Feedback>
            </Form.Group>
           




            {errors.server && (
              <div className="text-danger mb-3">{errors.server}</div>
            )}

            <Button
              type="submit"
              className="btnFormulario"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
            </Button>

            <div className="text-center mt-3">
              <Button
                variant="outline-primary"
                className="btnFormulario"
                onClick={() => navigate("/")}
              >
                Volver al login
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SignUp;

