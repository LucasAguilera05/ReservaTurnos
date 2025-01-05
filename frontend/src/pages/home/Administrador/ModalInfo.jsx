import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./Medicos.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container } from "react-bootstrap";

const ModalInfo = ({ user }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button className="btn iconoVer text-light" onClick={handleShow}>
        <i className="bi bi-eye iconoVer"></i> Historial Clinico
      </button>

      <Modal show={show} onHide={handleClose} className="modalUsuario">
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="titulo">Historial Clinico</span>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="d-flex flex-column align-items-center justify-content-center py-md-3">
            <article className="perfil-card-admin rounded py-2 mt-3 bg-datosAdmin text-light contenedorDatos">
              <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
                <h6 className="me-1 my-0 fw-bold">DNI</h6>
                <span className="ms-auto my-0">{user.dni}</span>
              </div>
              <hr className="my-1 mx-2" />
              <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
                <h6 className="me-1 my-0 fw-bold">Apellido</h6>
                <span className="ms-auto my-0">{user.apellido}</span>
              </div>
              <hr className="my-1 mx-2" />
              <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
                <h6 className="me-1 my-0 fw-bold pe-5">Nombre</h6>
                <span className="ms-5 my-0">{user.nombre}</span>
              </div>
              <hr className="my-1 mx-2" />
              <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
                <h6 className="me-1 my-0 fw-bold">Edad</h6>
                <span className="ms-auto my-0">{user.edad}</span>
              </div>
              <hr className="my-1 mx-2" />
              <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
                <h6 className="me-1 my-0 fw-bold">Peso</h6>
                <span className="ms-auto my-0">{user.peso}</span>
              </div>
              <hr className="my-1 mx-2" />
              <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
                <h6 className="me-1 my-0 fw-bold pe-5">Sexo</h6>
                <span className="ms-auto my-0">{user.sexo}</span>
              </div>
              <hr className="my-1 mx-2" />
              <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
                <h6 className="me-1 my-0 fw-bold pe-5">Altura</h6>
                <span className="ms-auto my-0">{user.altura}</span>
              </div>
              <hr className="my-1 mx-2" />
              <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
                <h6 className="me-1 my-0 fw-bold pe-5">Detalle</h6>
                <span className="ms-5 my-0">{user.historial}</span>
              </div>
            </article>
          </Container>
          <div className="text-center">
            <button
              onClick={handleClose}
              className="m-2 p-2 rounded btnCancelar"
            >
              Cerrar
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalInfo;
