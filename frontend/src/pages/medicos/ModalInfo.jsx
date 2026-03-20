import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "./Medicos.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { FaUserMd, FaCalendarAlt, FaStethoscope, FaClipboardList, FaNotesMedical } from "react-icons/fa";
import useTurnosStore from "../../stores/Turnos-Store";

const ModalInfo = ({ user }) => {
  const [show, setShow] = useState(false);

  const { turnos, obtenerTurnos } = useTurnosStore((state) => ({
    turnos: state.turnos,
    obtenerTurnos: state.obtenerTurnos,
  }));
  const [misTurnosCerrados, setMisTurnosCerrados] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    obtenerTurnos();
  };

  useEffect(() => {
    if (turnos.length > 0 && user?.id) {
      const completados = turnos.filter(
        (t) => String(t.pacienteId) === String(user.id) && t.estado === "Completado"
      );
      setMisTurnosCerrados(completados.reverse());
    }
  }, [turnos, user?.id]);

  return (
    <>
      <button className=" iconoVer" onClick={handleShow}>
        <i className="bi bi-eye iconoVer"></i> Historial Clinico
      </button>

      <Modal show={show} onHide={handleClose} size="xl" className="modalUsuario">
        <Modal.Header closeButton className="bg-azulOscuro text-white">
          <Modal.Title>
            <span className="titulo text-white fw-bold"><FaNotesMedical className="me-2" /> Historial Clínico Integral</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <Container fluid className="py-2">
            <Row className="g-4">
              {/* Datos Biométricos */}
              <Col xs={12} lg={4}>
                <Card className="shadow-sm border-0 h-100" style={{ borderRadius: "15px", overflow: "hidden" }}>
                  <Card.Header className="bg-azulOscuro text-white py-3 border-0">
                    <h5 className="mb-0 fw-bold"><FaUserMd className="me-2" /> Datos Generales del Paciente</h5>
                  </Card.Header>
                  <Card.Body className="bg-white">
                    <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                      <span className="text-muted fw-bold">Nombre</span>
                      <span className="fw-semibold text-end">{user?.nombre} {user?.apellido}</span>
                    </div>
                    <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                      <span className="text-muted fw-bold">DNI</span>
                      <span className="fw-semibold text-end">{user?.dni}</span>
                    </div>
                    <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                      <span className="text-muted fw-bold">Edad</span>
                      <span className="fw-semibold text-end">{user?.pacienteData?.edad ? `${user.pacienteData.edad} años` : '-'}</span>
                    </div>
                    <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                      <span className="text-muted fw-bold">Sexo</span>
                      <span className="fw-semibold text-end">{user?.pacienteData?.sexo || '-'}</span>
                    </div>
                    <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                      <span className="text-muted fw-bold">Peso</span>
                      <span className="fw-semibold text-end">{user?.pacienteData?.peso ? `${user.pacienteData.peso} kg` : '-'}</span>
                    </div>
                    <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                      <span className="text-muted fw-bold">Altura</span>
                      <span className="fw-semibold text-end">{user?.pacienteData?.altura ? `${user.pacienteData.altura} m` : '-'}</span>
                    </div>
                    <div className="pt-2">
                      <span className="text-muted fw-bold d-block mb-1">Antecedentes / Notas Adicionales</span>
                      <p className="mb-0 bg-light p-2 rounded border" style={{ fontSize: "0.95rem" }}>
                        {user?.pacienteData?.historial || 'Sin antecedentes registrados.'}
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Historial de Turnos */}
              <Col xs={12} lg={8}>
                <Card className="shadow-sm border-0 h-100" style={{ borderRadius: "15px", overflow: "hidden" }}>
                  <Card.Header className="bg-azulOscuro text-white py-3 border-0">
                    <h5 className="mb-0 fw-bold"><FaClipboardList className="me-2" /> Consultas y Evaluaciones Previas</h5>
                  </Card.Header>
                  <Card.Body className="bg-white p-md-4 p-3" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                    {misTurnosCerrados.length === 0 ? (
                      <div className="text-center text-muted py-5">
                        <FaNotesMedical size={50} className="mb-3 opacity-50" />
                        <h5>No hay consultas previas</h5>
                        <p>Aún no se han evaluado consultas para este paciente.</p>
                      </div>
                    ) : (
                      <div className="timeline">
                        {misTurnosCerrados.map((turno) => (
                          <Card key={turno.id} className="mb-3 border-0 shadow-sm timeline-card" style={{ borderLeft: "5px solid var(--color-primarioDos)" }}>
                            <Card.Body>
                              <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                                <h6 className="fw-bold mb-1 text-dark">
                                  <FaCalendarAlt className="me-2 text-muted" />
                                  {turno.fecha} - {turno.horario}
                                </h6>
                                <Badge bg="success" className="mb-1">Completado</Badge>
                              </div>
                              <h6 className="text-secondary mb-3">
                                <FaStethoscope className="me-1" /> Dr/a. {turno.medicoNombre} ({turno.medicoTipo})
                              </h6>

                              {(turno.diagnostico || turno.tratamiento) ? (
                                <>
                                  {turno.diagnostico && (
                                    <div className="mb-2 p-2 rounded bg-light border">
                                      <span className="fw-bold text-dark d-block mb-1">Diagnóstico:</span>
                                      <span className="text-muted">{turno.diagnostico}</span>
                                    </div>
                                  )}

                                  {turno.tratamiento && (
                                    <div className="p-2 rounded bg-light border">
                                      <span className="fw-bold text-dark d-block mb-1">Tratamiento e Indicaciones:</span>
                                      <span className="text-muted">{turno.tratamiento}</span>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="p-2 rounded bg-light border text-muted fst-italic">
                                  No se registraron detalles adicionales para esta consulta.
                                </div>
                              )}
                            </Card.Body>
                          </Card>
                        ))}
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <button
            onClick={handleClose}
            className="btn btn-secondary px-4 fw-bold shadow-sm"
          >
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalInfo;
