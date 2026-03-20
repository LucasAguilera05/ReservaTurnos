import React, { useEffect, useState } from "react";
import { Form, Table, Pagination, Row, Col } from "react-bootstrap";
import useTurnosStore from "../../stores/Turnos-Store";
import useAuth from "../../stores/Auth-Store";
import useUsuarios from "../../stores/Usuarios-Store";
import ModalSolicitar from "./ModalSolicitar";
import Cancelar from "./Cancelar";
import { FaSearch, FaUserMd, FaCalendarCheck, FaFilter, FaStethoscope } from "react-icons/fa";
import "./Pacientes.css";

const SolicitarTurno = () => {
  const usuarios = useUsuarios((state) => state.usuarios || []);
  const getUsuarios = useUsuarios((state) => state.getUsuarios);
  const { user } = useAuth((state) => ({ user: state.user }));
  const { usuario, getUsuarioById } = useUsuarios((state) => ({
    usuario: state.usuario,
    getUsuarioById: state.getUsuarioById,
  }));
  const { turnos, obtenerTurnos } = useTurnosStore();

  const [tabSeleccionada, setTabSeleccionada] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 10;

  useEffect(() => {
    obtenerTurnos();
    if (user?.id) {
      getUsuarioById(user.id);
    }
    getUsuarios();
  }, [user?.id, getUsuarioById, getUsuarios]);

  const handleTabSeleccionada = (e) => {
    setTabSeleccionada(e.target.value);
    setPaginaActual(1);
  };

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value.toLowerCase());
    setPaginaActual(1);
  };

  const normalizarTexto = (texto) => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const medicos = usuarios.filter((usuario) => usuario.rol === "Medico");
  const especialidadesUnicas = [...new Set(medicos.map((u) => u.medicoData?.especialidad).filter(Boolean))];

  const filtrarUsuarios = medicos.filter((usuario) => {
    const busquedaNormalizada = normalizarTexto(busqueda);
    const nombreNormalizado = normalizarTexto(usuario?.medicoData?.nombre || "");
    const apellidoNormalizado = normalizarTexto(usuario?.medicoData?.apellido || "");
    const categoriaSeleccionada =
      !tabSeleccionada || tabSeleccionada === usuario.medicoData?.especialidad;
    const busquedaRealizada =
      nombreNormalizado.toLowerCase().includes(busquedaNormalizada) ||
      apellidoNormalizado.toLowerCase().includes(busquedaNormalizada);

    return categoriaSeleccionada && busquedaRealizada;
  });

  const indiceUltimoUsuario = paginaActual * usuariosPorPagina;
  const indicePrimerUsuario = indiceUltimoUsuario - usuariosPorPagina;
  const usuariosActuales = filtrarUsuarios.slice(indicePrimerUsuario, indiceUltimoUsuario);
  const totalPaginas = Math.ceil(filtrarUsuarios.length / usuariosPorPagina);

  const handlePaginacionClick = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const misTurnosConfirmados = turnos.filter(
    (turno) => turno.pacienteId == user?.id && turno.estado === "Confirmado"
  );

  const formatDate = (dateStr) => {
    const parts = dateStr.split('-');
    return { day: parts[2], month: parts[1] };
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Solicitar Turno</h1>
        <p className="page-subtitle">Busca un medico y reserva tu turno</p>
      </div>

      {/* Filtros */}
      <div className="especialidad-selector animate-fadeInUp">
        <Row className="g-3 align-items-end">
          <Col xs={12} md={6}>
            <label className="especialidad-selector-title d-flex align-items-center">
              <FaFilter className="me-2" />
              Filtrar por especialidad
            </label>
            <Form.Select
              value={tabSeleccionada}
              onChange={handleTabSeleccionada}
              className="form-control-modern"
            >
              <option value="">Todas las especialidades</option>
              {especialidadesUnicas.map((especialidad, index) => (
                <option key={index} value={especialidad}>
                  {especialidad}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={12} md={6}>
            <label className="especialidad-selector-title d-flex align-items-center">
              <FaSearch className="me-2" />
              Buscar medico
            </label>
            <div className="position-relative">
              <Form.Control
                type="text"
                placeholder="Buscar por nombre o apellido..."
                value={busqueda}
                onChange={handleBusqueda}
                className="form-control-modern"
              />
            </div>
          </Col>
        </Row>
      </div>

      {/* Tabla de Medicos */}
      <div className="users-table-container animate-fadeInUp animate-delay-1">
        <div className="users-table-header">
          <h2 className="users-table-title mb-0">
            <FaUserMd className="me-2" />
            Medicos Disponibles ({filtrarUsuarios.length})
          </h2>
        </div>

        <Table responsive className="users-table mb-0">
          <thead>
            <tr>
              <th>Apellido</th>
              <th>Nombre</th>
              <th>Especialidad</th>
              <th className="text-center">Turnos</th>
            </tr>
          </thead>
          <tbody>
            {usuariosActuales.length === 0 ? (
              <tr>
                <td colSpan="4">
                  <div className="empty-state">
                    <FaUserMd className="empty-state-icon" />
                    <h3 className="empty-state-title">No hay medicos disponibles</h3>
                    <p className="empty-state-desc">No se encontraron medicos con los filtros aplicados</p>
                  </div>
                </td>
              </tr>
            ) : (
              usuariosActuales.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="fw-semibold">{usuario?.medicoData?.apellido}</td>
                  <td>{usuario?.medicoData?.nombre}</td>
                  <td>
                    <span className="d-inline-flex align-items-center gap-1" style={{ color: 'var(--color-primarioDos)', fontWeight: 500 }}>
                      <FaStethoscope />
                      {usuario?.medicoData?.especialidad}
                    </span>
                  </td>
                  <td className="text-center">
                    <ModalSolicitar usuario={usuario} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        {totalPaginas > 1 && (
          <Pagination className="pagination-modern mb-0">
            <Pagination.First onClick={() => handlePaginacionClick(1)} disabled={paginaActual === 1} />
            <Pagination.Prev onClick={() => handlePaginacionClick(paginaActual - 1)} disabled={paginaActual === 1} />
            {[...Array(totalPaginas)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === paginaActual}
                onClick={() => handlePaginacionClick(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePaginacionClick(paginaActual + 1)} disabled={paginaActual === totalPaginas} />
            <Pagination.Last onClick={() => handlePaginacionClick(totalPaginas)} disabled={paginaActual === totalPaginas} />
          </Pagination>
        )}
      </div>

      {/* Mis Turnos Confirmados */}
      <div className="mis-turnos-section animate-fadeInUp animate-delay-2">
        <div className="mis-turnos-header">
          <div className="mis-turnos-icon">
            <FaCalendarCheck />
          </div>
          <h3 className="mis-turnos-title">Mis Turnos Confirmados</h3>
        </div>

        {misTurnosConfirmados.length === 0 ? (
          <div className="text-center py-4">
            <FaCalendarCheck style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '1rem' }} />
            <p style={{ color: '#94a3b8' }}>No tienes turnos confirmados actualmente</p>
          </div>
        ) : (
          <div>
            {misTurnosConfirmados.map((turno) => {
              const date = formatDate(turno.fecha);
              return (
                <div key={turno.id} className="turno-item">
                  <div className="turno-date-badge">
                    <div className="turno-date-day">{date.day}</div>
                    <div className="turno-date-month">{date.month}</div>
                  </div>
                  <div className="turno-details">
                    <div className="turno-time">{turno.horario}</div>
                    <div className="turno-medico">Dr/a. {turno.medicoNombre}</div>
                    <div className="turno-especialidad">{turno.medicoTipo}</div>
                  </div>
                  <Cancelar turno={turno} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SolicitarTurno;
