import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import "./Pacientes.css";
import useAuth from "../../stores/Auth-Store";
import useUsuarios from "../../stores/Usuarios-Store";

const Historial = () => {
  const { user } = useAuth((state) => ({ user: state.user }));
  const { usuario, getUsuarioById } = useUsuarios((state) => ({
    usuario: state.usuario,
    getUsuarioById: state.getUsuarioById,
  }));

  useEffect(() => {
    if (user?.id) {
      getUsuarioById(user.id);
    }
  }, [user?.id, getUsuarioById]);

  return (
    <Container className="d-flex flex-column align-items-center justify-content-cente py-md-3">      
      <article className="perfil-card rounded py-2 mt-3 bg-azulOscuro text-light">
        <h1 className="text-center">Mi Historial Clínico</h1>
        <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
          <h6 className="me-1 my-0 fw-bold">DNI:</h6>
          <span>{usuario?.dni}</span>
        </div>
        <hr className="my-1 mx-2" />
        <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
          <h6 className="me-1 my-0 fw-bold">Nombre Completo</h6>
          <span>
            {usuario?.nombre} {usuario?.apellido}
          </span>
        </div>
        <hr className="my-1 mx-2" />
        <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
          <h6 className="me-1 my-0 fw-bold">Edad</h6>
          <span>{usuario?.edad}</span>
        </div>
        <hr className="my-1 mx-2" />
        <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
          <h6 className="me-1 my-0 fw-bold">Peso</h6>
          <span>{usuario?.peso}</span>
        </div>
        <hr className="my-1 mx-2" />
        <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
          <h6 className="me-1 my-0 fw-bold">Sexo</h6>
          <span>{usuario?.sexo}</span>
        </div>
        <hr className="my-1 mx-2" />
        <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
          <h6 className="me-1 my-0 fw-bold">Altura</h6>
          <span>{usuario?.altura}</span>
        </div>
        <hr className="my-1 mx-2" />
        <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
          <h6 className="me-1 my-0 fw-bold">Detalle</h6>
          <span>{usuario?.historial}</span>
        </div>
      </article>
    </Container>
  );
};

export default Historial;
