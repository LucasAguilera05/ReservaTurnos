import React, { useEffect, useState } from "react";
import { Row, Col, Card, Badge } from "react-bootstrap";
import { FaUserMd, FaCalendarAlt, FaStethoscope, FaClipboardList, FaNotesMedical, FaWeight, FaRuler } from "react-icons/fa";
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
      setMisTurnosCerrados(completados.reverse());
    }
  }, [turnos, user?.id]);

  const patientData = [
    { label: "Nombre", value: `${usuario?.pacienteData?.nombre || ""} ${usuario?.pacienteData?.apellido || ""}`.trim() },
    { label: "DNI", value: usuario?.pacienteData?.dni },
    { label: "Edad", value: usuario?.pacienteData?.edad ? `${usuario.pacienteData.edad} anos` : '-' },
    { label: "Sexo", value: usuario?.pacienteData?.sexo },
    { label: "Peso", value: usuario?.pacienteData?.peso ? `${usuario.pacienteData.peso} kg` : '-' },
    { label: "Altura", value: usuario?.pacienteData?.altura ? `${usuario.pacienteData.altura} m` : '-' },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          <FaNotesMedical className="me-2" />
          Mi Historial Clinico
        </h1>
        <p className="page-subtitle">Revisa tu historial de consultas y tratamientos</p>
      </div>

      <Row className="g-4">
        {/* Datos del Paciente */}
        <Col xs={12} lg={4}>
          <div className="patient-data-card animate-fadeInUp">
            <div className="patient-data-header">
              <h5 className="mb-0 fw-bold d-flex align-items-center">
                <FaUserMd className="me-2"/>
                Mis Datos
              </h5>
            </div>
            <div className="patient-data-body">
              {patientData.map((item, index) => (
                <div key={index} className="patient-data-item">
                  <span className="patient-data-label">{item.label}</span>
                  <span className="patient-data-value">{item.value || '-'}</span>
                </div>
              ))}
              <div className="mt-3 pt-3 border-top">
                <span className="patient-data-label d-block mb-2">Antecedentes / Notas</span>
                <p className="mb-0 bg-white p-3 rounded border" style={{ fontSize: "0.9rem", color: '#64748b' }}>
                  {usuario?.pacienteData?.historial || 'Sin antecedentes registrados.'}
                </p>
              </div>
            </div>
          </div>
        </Col>

        {/* Historial de Consultas */}
        <Col xs={12} lg={8}>
          <div className="card-modern animate-fadeInUp animate-delay-1" style={{ height: '100%' }}>
            <div className="p-4 border-bottom" style={{ background: 'linear-gradient(135deg, var(--color-fondo) 0%, var(--color-fondo-light) 100%)' }}>
              <h5 className="mb-0 fw-bold text-white d-flex align-items-center">
                <FaClipboardList className="me-2"/>
                Consultas y Evaluaciones
              </h5>
            </div>
            <div className="p-4" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {misTurnosCerrados.length === 0 ? (
                <div className="empty-state-historial">
                  <FaNotesMedical className="empty-state-historial-icon" />
                  <h3 className="empty-state-historial-title">No hay consultas previas</h3>
                  <p className="empty-state-historial-desc">
                    Cuando el medico complete un turno, su diagnostico y tratamiento apareceran aqui.
                  </p>
                </div>
              ) : (
                <div className="historial-timeline">
                  {misTurnosCerrados.map((turno) => (
                    <div key={turno.id} className="historial-card">
                      <div className="p-3">
                        <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                          <h6 className="fw-bold mb-1" style={{ color: 'var(--fuente-color-secundario)' }}>
                            <FaCalendarAlt className="me-2" style={{ color: '#94a3b8' }} />
                            {turno.fecha} - {turno.horario}
                          </h6>
                          <Badge bg="success" className="mb-1">Completado</Badge>
                        </div>
                        <h6 className="mb-3" style={{ color: 'var(--color-primarioDos)' }}>
                          <FaStethoscope className="me-1" /> Dr/a. {turno.medicoNombre} ({turno.medicoTipo})
                        </h6>
                        
                        {(turno.diagnostico || turno.tratamiento) ? (
                          <>
                            {turno.diagnostico && (
                              <div className="mb-2 p-3 rounded" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                <span className="fw-bold d-block mb-1" style={{ color: 'var(--fuente-color-secundario)', fontSize: '0.85rem' }}>
                                  Diagnostico:
                                </span>
                                <span style={{ color: '#64748b' }}>{turno.diagnostico}</span>
                              </div>
                            )}
                            
                            {turno.tratamiento && (
                              <div className="p-3 rounded" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                <span className="fw-bold d-block mb-1" style={{ color: 'var(--fuente-color-secundario)', fontSize: '0.85rem' }}>
                                  Tratamiento e Indicaciones:
                                </span>
                                <span style={{ color: '#64748b' }}>{turno.tratamiento}</span>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="p-3 rounded fst-italic" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#94a3b8' }}>
                            El medico no registro detalles adicionales para esta consulta.
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Historial;
