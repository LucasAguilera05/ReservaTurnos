import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { FaUserMd, FaCalendarAlt, FaStethoscope, FaClipboardList, FaNotesMedical } from "react-icons/fa";
import "./Pacientes.css";
import useAuth from "../../stores/Auth-Store";
import useUsuarios from "../../stores/Usuarios-Store";
import useTurnosStore from "../../stores/Turnos-Store";

const Historial = () => {
  const { user } = useAuth((state) => ({ user: state.user }));
  const { usuario, getUsuarioById } = useUsuarios((state) => ({
    usuario: state.usuario,
    getUsuarioById: state.getUsuarioById,
  }));
  const { turnos, obtenerTurnos } = useTurnosStore((state) => ({
    turnos: state.turnos,
    obtenerTurnos: state.obtenerTurnos,
  }));

  const [misTurnosCerrados, setMisTurnosCerrados] = useState([]);

  useEffect(() => {
    if (user?.id) {
      getUsuarioById(user.id);
      obtenerTurnos();
    }
  }, [user?.id, getUsuarioById, obtenerTurnos]);

  useEffect(() => {
    if (turnos.length > 0 && user?.id) {
      const completados = turnos.filter(
        (t) => String(t.pacienteId) === String(user.id) && t.estado === "Completado"
      );
      // Reverse to show latest first
      setMisTurnosCerrados(completados.reverse());
    }
  }, [turnos, user?.id]);

  return (
    <Container className="py-md-4 py-3">
      <h2 className="mb-4 fw-bold text-center text-md-start" style={{ color: "var(--color-fondo)" }}>
        <FaNotesMedical className="me-2 mb-1" />
        Mi Historial Clínico
      </h2>

      <Row className="g-4">
        {/* Datos Biométricos */}
        <Col xs={12} lg={4}>
          <Card className="shadow-sm border-0 h-100" style={{ borderRadius: "15px", overflow: "hidden" }}>
            <Card.Header className="bg-azulOscuro text-white py-3 border-0">
              <h5 className="mb-0 fw-bold"><FaUserMd className="me-2"/> Datos Generales</h5>
            </Card.Header>
            <Card.Body className="bg-light">
              <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                <span className="text-muted fw-bold">Nombre</span>
                <span className="fw-semibold text-end">{usuario?.pacienteData?.nombre} {usuario?.pacienteData?.apellido}</span>
              </div>
              <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                <span className="text-muted fw-bold">DNI</span>
                <span className="fw-semibold text-end">{usuario?.pacienteData?.dni}</span>
              </div>
              <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                <span className="text-muted fw-bold">Edad</span>
                <span className="fw-semibold text-end">{usuario?.pacienteData?.edad ? `${usuario.pacienteData.edad} años` : '-'}</span>
              </div>
              <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                <span className="text-muted fw-bold">Sexo</span>
                <span className="fw-semibold text-end">{usuario?.pacienteData?.sexo || '-'}</span>
              </div>
              <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                <span className="text-muted fw-bold">Peso</span>
                <span className="fw-semibold text-end">{usuario?.pacienteData?.peso ? `${usuario.pacienteData.peso} kg` : '-'}</span>
              </div>
              <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                <span className="text-muted fw-bold">Altura</span>
                <span className="fw-semibold text-end">{usuario?.pacienteData?.altura ? `${usuario.pacienteData.altura} m` : '-'}</span>
              </div>
              <div className="pt-2">
                <span className="text-muted fw-bold d-block mb-1">Antecedentes / Notas Adicionales</span>
                <p className="mb-0 bg-white p-2 rounded border" style={{ fontSize: "0.95rem" }}>
                  {usuario?.pacienteData?.historial || 'Sin antecedentes registrados.'}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Historial de Turnos */}
        <Col xs={12} lg={8}>
          <Card className="shadow-sm border-0 h-100" style={{ borderRadius: "15px", overflow: "hidden" }}>
            <Card.Header className="bg-azulOscuro text-white py-3 border-0">
              <h5 className="mb-0 fw-bold"><FaClipboardList className="me-2"/> Consultas y Evaluaciones</h5>
            </Card.Header>
            <Card.Body className="bg-light p-md-4 p-3">
              {misTurnosCerrados.length === 0 ? (
                <div className="text-center text-muted py-5">
                  <FaNotesMedical size={50} className="mb-3 opacity-50" />
                  <h5>No hay consultas previas</h5>
                  <p>Cuando el médico complete un turno, su diagnóstico y tratamiento aparecerán aquí.</p>
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
                              <div className="mb-2 p-2 rounded bg-white border">
                                <span className="fw-bold text-dark d-block mb-1">Diagnóstico:</span>
                                <span className="text-muted">{turno.diagnostico}</span>
                              </div>
                            )}
                            
                            {turno.tratamiento && (
                              <div className="p-2 rounded bg-white border">
                                <span className="fw-bold text-dark d-block mb-1">Tratamiento e Indicaciones:</span>
                                <span className="text-muted">{turno.tratamiento}</span>
                              </div>
                            )}
                          </>
                        ) : (
                           <div className="p-2 rounded bg-white border text-muted fst-italic">
                              El médico no registró detalles adicionales para esta consulta.
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
  );
};

export default Historial;
