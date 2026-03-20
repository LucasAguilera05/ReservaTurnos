import { Container, Form, Table, Pagination, Row, Col } from "react-bootstrap";
import useUsuarios from "../../stores/Usuarios-Store";
import ModalInfo from "./ModalInfo";
import { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Medicos.css";
import { FaSearch, FaUsers, FaHospitalUser } from "react-icons/fa";

const ListadoUsuarios = () => {
  const usuarios = useUsuarios((state) => state.usuarios || []);
  const getUsuarios = useUsuarios((state) => state.getUsuarios);

  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 10;

  useEffect(() => {
    getUsuarios();
  }, [getUsuarios]);

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value.toLowerCase());
    setPaginaActual(1);
  };

  const normalizarTexto = (texto) => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filtrarUsuarios = usuarios.filter((usuario) => {
    const busquedaNormalizada = normalizarTexto(busqueda);
    const nombreNormalizado = normalizarTexto(usuario?.pacienteData?.nombre || "");
    const apellidoNormalizado = normalizarTexto(usuario?.pacienteData?.apellido || "");
    const esPaciente = usuario.rol === "Paciente";
    const busquedaRealizada =
      nombreNormalizado.toLowerCase().includes(busquedaNormalizada) ||
      apellidoNormalizado.toLowerCase().includes(busquedaNormalizada);

    return esPaciente && busquedaRealizada;
  });

  const indiceUltimoUsuario = paginaActual * usuariosPorPagina;
  const indicePrimerUsuario = indiceUltimoUsuario - usuariosPorPagina;
  const usuariosActuales = filtrarUsuarios.slice(indicePrimerUsuario, indiceUltimoUsuario);
  const totalPaginas = Math.ceil(filtrarUsuarios.length / usuariosPorPagina);

  const handlePaginacionClick = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Historial de Pacientes</h1>
        <p className="page-subtitle">Consulta el historial clinico de tus pacientes</p>
      </div>

      <div className="users-table-container animate-fadeInUp">
        <div className="users-table-header d-flex flex-wrap justify-content-between align-items-center gap-3">
          <h2 className="users-table-title mb-0">
            <FaHospitalUser className="me-2" />
            Pacientes ({filtrarUsuarios.length})
          </h2>
          <div className="position-relative" style={{ minWidth: '280px' }}>
            <FaSearch className="position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <Form.Control
              type="text"
              placeholder="Buscar por nombre o apellido..."
              value={busqueda}
              onChange={handleBusqueda}
              className="form-control-modern ps-5"
            />
          </div>
        </div>

        <Table responsive className="users-table mb-0">
          <thead>
            <tr>
              <th>Apellido</th>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Correo</th>
              <th className="text-center">Historial</th>
            </tr>
          </thead>
          <tbody>
            {usuariosActuales.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <div className="empty-state">
                    <FaUsers className="empty-state-icon" />
                    <h3 className="empty-state-title">No hay pacientes</h3>
                    <p className="empty-state-desc">No se encontraron pacientes con los filtros aplicados</p>
                  </div>
                </td>
              </tr>
            ) : (
              usuariosActuales.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="fw-semibold">{usuario?.pacienteData?.apellido}</td>
                  <td>{usuario?.pacienteData?.nombre}</td>
                  <td>{usuario?.pacienteData?.dni}</td>
                  <td>{usuario.email}</td>
                  <td className="text-center">
                    <ModalInfo user={usuario} />
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

export default ListadoUsuarios;
