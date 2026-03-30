import React, { useEffect, useState } from "react";
import { Container, Form, Table, Pagination, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../stores/Auth-Store";
import useUsuarios from "../../../stores/Usuarios-Store";
import Swal from "sweetalert2";
import { FaSearch, FaFilter, FaEdit, FaTrash, FaUsers, FaUserMd, FaHospitalUser, FaUserShield } from "react-icons/fa";
import "./Administrador.css";

const AdminUsers = () => {
  const usuarios = useUsuarios((state) => state.usuarios || []);
  const getUsuarios = useUsuarios((state) => state.getUsuarios);
  const { user } = useAuth((state) => ({ user: state.user }));
  const { getUsuarioById, deleteUsuario } = useUsuarios((state) => ({
    getUsuarioById: state.getUsuarioById,
    deleteUsuario: state.deleteUsuario,
  }));

  const [busqueda, setBusqueda] = useState("");
  const [tabSeleccionada, setTabSeleccionada] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 10;

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      getUsuarioById(user.id);
    }
    getUsuarios();
  }, [user?.id, getUsuarioById, getUsuarios]);

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value.toLowerCase());
    setPaginaActual(1);
  };

  const handleTabSeleccionada = (e) => {
    setTabSeleccionada(e.target.value);
    setPaginaActual(1);
  };

  const normalizarTexto = (texto) => {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const rolesUnicos = [
    ...new Map(
      usuarios.map((usuario) => [
        normalizarTexto(usuario.rol),
        usuario.rol,
      ])
    ).values(),
  ];

  const filtrarUsuarios = usuarios.filter((usuario) => {
    const nombre = usuario?.pacienteData?.nombre || usuario?.medicoData?.nombre || usuario?.adminData?.nombre || "";
    const apellido = usuario?.pacienteData?.apellido || usuario?.medicoData?.apellido || usuario?.adminData?.apellido || "";
    const busquedaNormalizada = normalizarTexto(busqueda);
    const nombreNormalizado = normalizarTexto(nombre);
    const apellidoNormalizado = normalizarTexto(apellido);

    const rolSeleccionado =
      !tabSeleccionada ||
      normalizarTexto(usuario.rol) === normalizarTexto(tabSeleccionada);

    const busquedaRealizada =
      nombreNormalizado.includes(busquedaNormalizada) ||
      apellidoNormalizado.includes(busquedaNormalizada);

    return rolSeleccionado && busquedaRealizada;
  });

  const indiceUltimoUsuario = paginaActual * usuariosPorPagina;
  const indicePrimerUsuario = indiceUltimoUsuario - usuariosPorPagina;
  const usuariosActuales = filtrarUsuarios.slice(indicePrimerUsuario, indiceUltimoUsuario);
  const totalPaginas = Math.ceil(filtrarUsuarios.length / usuariosPorPagina);

  const handlePaginacionClick = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const handleModificarUsuario = (idUsuario) => {
    navigate(`/Administrador/PanelAdmin/EditarUsuario/${idUsuario}`);
  };

  const handleEliminarUsuario = (idUsuario) => {
    Swal.fire({
      title: "Eliminar usuario",
      text: "Esta accion no se puede deshacer. Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
      customClass: { popup: 'rounded-3' }
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUsuario(idUsuario);
        getUsuarios();
        Swal.fire({
          title: "Eliminado",
          text: "El usuario ha sido eliminado",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          customClass: { popup: 'rounded-3' }
        });
      }
    });
  };

  const getRoleBadgeClass = (rol) => {
    const normalizedRol = normalizarTexto(rol);
    if (normalizedRol.includes("paciente")) return "paciente";
    if (normalizedRol.includes("medico")) return "medico";
    return "admin";
  };

  const getRoleIcon = (rol) => {
    const normalizedRol = normalizarTexto(rol);
    if (normalizedRol.includes("paciente")) return <FaHospitalUser />;
    if (normalizedRol.includes("medico")) return <FaUserMd />;
    return <FaUserShield />;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Gestion de Usuarios</h1>
        <p className="page-subtitle">Administra todos los usuarios del sistema</p>
      </div>

      <div className="users-table-container animate-fadeInUp">
        <div className="users-table-header">
          <h2 className="users-table-title">
            <FaUsers className="me-2" />
            Todos los Usuarios ({filtrarUsuarios.length})
          </h2>
        </div>

        <div className="users-search-container">
          <div className="users-search-input position-relative">
            <FaSearch className="position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <Form.Control
              type="text"
              placeholder="Buscar por nombre o apellido..."
              value={busqueda}
              onChange={handleBusqueda}
              className="form-control-modern ps-5"
            />
          </div>
          <div className="users-filter-select position-relative">
            <FaFilter className="position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', zIndex: 1 }} />
            <Form.Select
              value={tabSeleccionada}
              onChange={handleTabSeleccionada}
              className="form-control-modern ps-5"
            >
              <option value="">Todos los roles</option>
              {rolesUnicos.map((rol, index) => (
                <option key={index} value={rol}>
                  {rol}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>

        <Table responsive className="users-table mb-0">
          <thead>
            <tr>
              <th>Apellido</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosActuales.length === 0 ? (
              <tr>
                <td colSpan="4">
                  <div className="empty-state">
                    <FaUsers className="empty-state-icon" />
                    <h3 className="empty-state-title">No hay usuarios</h3>
                    <p className="empty-state-desc">No se encontraron usuarios con los filtros aplicados</p>
                  </div>
                </td>
              </tr>
            ) : (
              usuariosActuales.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="fw-semibold">
                    {usuario?.pacienteData?.apellido || usuario?.medicoData?.apellido || usuario?.adminData?.apellido}
                  </td>
                  <td>
                    {usuario?.pacienteData?.nombre || usuario?.medicoData?.nombre || usuario?.adminData?.nombre}
                  </td>
                  <td>
                    <span className={`user-role-badge ${getRoleBadgeClass(usuario.rol)}`}>
                      {getRoleIcon(usuario.rol)}
                      {usuario.rol}
                    </span>
                  </td>
                  <td>
                    <div className="user-actions justify-content-center">
                      <button
                        className="user-action-btn edit"
                        onClick={() => handleModificarUsuario(usuario.id)}
                        title="Modificar usuario"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="user-action-btn delete"
                        onClick={() => handleEliminarUsuario(usuario.id)}
                        title="Eliminar usuario"
                      >
                        <FaTrash />
                      </button>
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

export default AdminUsers;
