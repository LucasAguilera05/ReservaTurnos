import React, { useEffect, useState } from "react";
import { Button, Form, Nav, Pagination, Table } from "react-bootstrap";
import useTurnosStore from "../../stores/Turnos-Store";
import { MdDelete } from "react-icons/md";
import { FaCalendarPlus, FaCalendarAlt, FaCalendarCheck, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import CrearTurno from "./ModalesTurnos/CrearTurno";
import EditarTurno from "./ModalesTurnos/EditarTurno";
import useAuth from "../../stores/Auth-Store";
import useUsuarios from "../../stores/Usuarios-Store";
import "./Medicos.css";

const Turnos = () => {
  const usuarios = useUsuarios((state) => state.usuarios || []);
  const getUsuarios = useUsuarios((state) => state.getUsuarios);
  const { user } = useAuth((state) => ({ user: state.user }));
  const { usuario, getUsuarioById } = useUsuarios((state) => ({
    usuario: state.usuario,
    getUsuarioById: state.getUsuarioById,
  }));
  const { turnos, obtenerTurnos, borrarTurno } = useTurnosStore();
  
  const hoy = new Date();
  const dia = String(hoy.getDate()).padStart(2, '0');
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const anio = hoy.getFullYear();
  const fecha = `${anio}-${mes}-${dia}`;

  const [tabSeleccionada, setTabSeleccionada] = useState(fecha);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const turnosPorPagina = 10;

  useEffect(() => {
    obtenerTurnos();
    if (user?.id) {
      getUsuarioById(user.id);
    }
    getUsuarios();
  }, [user?.id, getUsuarioById, getUsuarios]);

  const handleTabSeleccionada = (tab) => {
    setTabSeleccionada(tab);
    setPaginaActual(1);
  };

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value.toLowerCase());
    setPaginaActual(1);
  };

  const normalizarTexto = (texto) => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filtrarTurnos = turnos.filter((turno) => {
    const busquedaNormalizada = normalizarTexto(busqueda);
    const fechaNormalizada = normalizarTexto(turno.fecha);
    const horarioNormalizado = normalizarTexto(turno.horario);
    
    const busquedaRealizada =
      fechaNormalizada.toLowerCase().includes(busquedaNormalizada) ||
      horarioNormalizado.toLowerCase().includes(busquedaNormalizada);

    let categoriaSeleccionada = false;
    if (tabSeleccionada === fecha) {
      categoriaSeleccionada = (turno.fecha === fecha) && (turno.estado !== "Completado");
    } else {
      categoriaSeleccionada = (turno.estado === tabSeleccionada);
    }

    return categoriaSeleccionada && busquedaRealizada && turno.medicoId == user?.id;
  });

  const indiceUltimoTurno = paginaActual * turnosPorPagina;
  const indicePrimerTurno = indiceUltimoTurno - turnosPorPagina;
  const turnosActuales = filtrarTurnos.slice(indicePrimerTurno, indiceUltimoTurno);
  const totalPaginas = Math.ceil(filtrarTurnos.length / turnosPorPagina);

  const handlePaginacionClick = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const eliminarTurno = (id) => {
    Swal.fire({
      title: "Eliminar turno",
      text: "Esta accion no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
      customClass: { popup: 'rounded-3' }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await borrarTurno(id);
          Swal.fire({
            title: "Eliminado",
            text: "El turno ha sido eliminado",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            customClass: { popup: 'rounded-3' }
          });
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: error.message || "No se pudo eliminar el turno",
            icon: "error",
            customClass: { popup: 'rounded-3' }
          });
        }
      }
    });
  };

  const getStatusBadge = (estado) => {
    const statusMap = {
      'Ninguno': { class: 'disponible', label: 'Disponible' },
      'Confirmado': { class: 'confirmado', label: 'Confirmado' },
      'Completado': { class: 'completado', label: 'Completado' },
      'Cancelado': { class: 'cancelado', label: 'Cancelado' }
    };
    const status = statusMap[estado] || { class: 'disponible', label: estado };
    return <span className={`turno-status ${status.class}`}>{status.label}</span>;
  };

  const tabs = [
    { key: fecha, label: 'Hoy', icon: <FaCalendarAlt /> },
    { key: 'Ninguno', label: 'Disponibles', icon: <FaClock /> },
    { key: 'Confirmado', label: 'Confirmados', icon: <FaCalendarCheck /> },
    { key: 'Completado', label: 'Completados', icon: <FaCheckCircle /> },
  ];

  return (
    <div className="page-container">
      <div className="page-header d-flex flex-wrap justify-content-between align-items-start gap-3">
        <div>
          <h1 className="page-title">Mis Turnos</h1>
          <p className="page-subtitle">Gestiona tu agenda de turnos medicos</p>
        </div>
        <CrearTurno />
      </div>

      <div className="card-modern animate-fadeInUp">
        <Nav className="tabs-modern mx-3 mt-3" onSelect={(key) => handleTabSeleccionada(key)}>
          {tabs.map((tab) => (
            <Nav.Item key={tab.key}>
              <Nav.Link
                eventKey={tab.key}
                active={tabSeleccionada === tab.key}
                className="d-flex align-items-center gap-2"
              >
                {tab.icon}
                <span className="d-none d-md-inline">{tab.label}</span>
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <Table responsive className="users-table mb-0">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Horario</th>
              <th>Estado</th>
              <th>Paciente</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {turnosActuales.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <div className="empty-state">
                    <FaCalendarAlt className="empty-state-icon" />
                    <h3 className="empty-state-title">No hay turnos</h3>
                    <p className="empty-state-desc">No se encontraron turnos en esta categoria</p>
                  </div>
                </td>
              </tr>
            ) : (
              turnosActuales.map((turno) => (
                <tr key={turno.id}>
                  <td className="fw-semibold">{turno.fecha}</td>
                  <td>{turno.horario}</td>
                  <td>{getStatusBadge(turno.estado)}</td>
                  <td>{turno.pacienteNombre || '-'}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="turno-action-btn delete"
                        onClick={() => eliminarTurno(turno.id)}
                        title="Eliminar turno"
                      >
                        <MdDelete />
                      </button>
                      <EditarTurno turno={turno} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        {totalPaginas > 1 && (
          <Pagination className="pagination-modern mb-0">
            <Pagination.First
              onClick={() => handlePaginacionClick(1)}
              disabled={paginaActual === 1}
            />
            <Pagination.Prev
              onClick={() => handlePaginacionClick(paginaActual - 1)}
              disabled={paginaActual === 1}
            />
            {[...Array(totalPaginas)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === paginaActual}
                onClick={() => handlePaginacionClick(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePaginacionClick(paginaActual + 1)}
              disabled={paginaActual === totalPaginas}
            />
            <Pagination.Last
              onClick={() => handlePaginacionClick(totalPaginas)}
              disabled={paginaActual === totalPaginas}
            />
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default Turnos;
