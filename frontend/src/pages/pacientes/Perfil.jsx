import React, { useEffect } from "react";
import avatar from "../../assets/avatarPerfil.jpeg";
import { Container } from "react-bootstrap";
import "./Pacientes.css";
import useAuth from "../../stores/Auth-Store";
import useUsuarios from "../../stores/Usuarios-Store";

const Perfil = () => {
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
      <img src={avatar} alt="avatar" className="avatarPerfil" />
      <article className="perfil-card rounded py-2 mt-3 bg-azulOscuro text-light">
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
          <h6 className="me-1 my-0 fw-bold">Correo Electrónico</h6>
          <span>{usuario?.email}</span>
        </div>
        <hr className="my-1 mx-2" />
        <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
          <h6 className="me-1 my-0 fw-bold">Direccion</h6>
          <span>{usuario?.direccion}</span>
        </div>
        <hr className="my-1 mx-2" />
        <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
          <h6 className="me-1 my-0 fw-bold">Número de Celular</h6>
          <span>{usuario?.telefono}</span>
        </div>
        <hr className="my-1 mx-2" />
        <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
          <h6 className="me-1 my-0 fw-bold">Número de Celular Padres</h6>
          <span>3816097754 - 381524625</span>
        </div>
      </article>
    </Container>
  );
};

export default Perfil;
