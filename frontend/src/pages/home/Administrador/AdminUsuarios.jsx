import React, { useEffect, useState } from "react";
import { Container, Form, Table, Pagination, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../stores/Auth-Store";
import useUsuarios from "../../../stores/Usuarios-Store";

const AdminUsers = () => {
  const usuarios = useUsuarios((state) => state.usuarios || []);
  const getUsuarios = useUsuarios((state) => state.getUsuarios);
  const { user } = useAuth((state) => ({ user: state.user }));
  const { usuario, getUsuarioById, deleteUsuario } = useUsuarios((state) => ({
    usuario: state.usuario,
    getUsuarioById: state.getUsuarioById,
    deleteUsuario: state.deleteUsuario,
  }));

  const [busqueda, setBusqueda] = useState("");
  const [tabSeleccionada, setTabSeleccionada] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 10;

  const navigate = useNavigate();  // Después

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
    const busquedaNormalizada = normalizarTexto(busqueda);
    const nombreNormalizado = normalizarTexto(usuario.nombre);
    const apellidoNormalizado = normalizarTexto(usuario.apellido);

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
  const usuariosActuales = filtrarUsuarios.slice(
    indicePrimerUsuario,
    indiceUltimoUsuario
  );
  const totalPaginas = Math.ceil(filtrarUsuarios.length / usuariosPorPagina);

  const handlePaginacionClick = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const handleModificarUsuario = (idUsuario) => {
    console.log(`Modificar usuario con ID: ${idUsuario}`);
    // Redirigir a una página de edición de usuario
    history.push(`/admin/editar-usuario/${idUsuario}`);
  };

  const handleEliminarUsuario = (idUsuario) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      deleteUsuario(idUsuario); // Llamada para eliminar el usuario
      getUsuarios(); // Refrescar la lista de usuarios
    }
  };

  return (
    <Container className="text-center px-md-5 py-md-2">
      <h2 className="my-5 disenoTitulo text-primary">Todos Los Usuarios</h2>

      {/* Filtro por rol */}
      <Form.Group className="mb-4">
        <Form.Label>Seleccione un Rol</Form.Label>
        <Form.Select
          value={tabSeleccionada}
          onChange={handleTabSeleccionada}
          className="mx-auto"
          style={{ width: "50%" }}
        >
          <option value="">Todos</option>
          {rolesUnicos.map((rol, index) => (
            <option key={index} value={rol}>
              {rol}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Campo de búsqueda */}
      <Form.Group className="mb-4">
        <Form.Label>Búsqueda</Form.Label>
        <Form.Control
          type="text"
          placeholder="Buscar por nombre o apellido"
          value={busqueda}
          onChange={handleBusqueda}
          className="mx-auto"
          style={{ width: "50%" }}
        />
      </Form.Group>

      {/* Tabla de usuarios */}
      <Table striped hover responsive className="rounded">
        <thead>
          <tr>
            <th className="tableMaterias fw-bold text-center">Apellido</th>
            <th className="tableMaterias fw-bold text-center">Nombre</th>
            <th className="tableMaterias fw-bold text-center">Rol</th>
            <th className="tableMaterias fw-bold text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosActuales.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No hay Usuarios disponibles.
              </td>
            </tr>
          ) : (
            usuariosActuales.map((usuario) => (
              <tr key={usuario.id}>
                <td className="tableMaterias text-center">{usuario.apellido}</td>
                <td className="tableMaterias text-center">{usuario.nombre}</td>
                <td className="tableMaterias text-center">{usuario.rol}</td>
                <td className="tableMaterias text-center">
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleModificarUsuario(usuario.id)}
                  >
                    Modificar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleEliminarUsuario(usuario.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Paginación */}
      <Pagination className="justify-content-center mt-4">
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
    </Container>
  );
};

export default AdminUsers;
