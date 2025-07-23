import React, { useEffect, useState } from "react";
import { Container, Form, Table, Pagination, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import useTurnosStore from "../../stores/Turnos-Store";
import useAuth from "../../stores/Auth-Store";
import useUsuarios from "../../stores/Usuarios-Store";
import ModalSolicitar from "./ModalSolicitar";
import Cancelar from "./Cancelar";
const solicitarTurno = () => {
  const usuarios = useUsuarios((state) => state.usuarios || []);
  const getUsuarios = useUsuarios((state) => state.getUsuarios);
  const { user } = useAuth((state) => ({ user: state.user }));
  const { usuario, getUsuarioById } = useUsuarios((state) => ({
    usuario: state.usuario,
    getUsuarioById: state.getUsuarioById,
  }));
  const { turnos, obtenerTurnos, borrarTurno } = useTurnosStore();

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

  const especialidadesUnicas = [...new Set(medicos.map((u) => u.especialidad))];

  const filtrarUsuarios = medicos.filter((usuario) => {
    const busquedaNormalizada = normalizarTexto(busqueda);
    const nombreNormalizado = normalizarTexto(usuario.nombre);
    const apellidoNormalizado = normalizarTexto(usuario.apellido);
    const categoriaSeleccionada =
      !tabSeleccionada || tabSeleccionada === usuario.especialidad;
    const busquedaRealizada =
      nombreNormalizado.toLowerCase().includes(busquedaNormalizada) ||
      apellidoNormalizado.toLowerCase().includes(busquedaNormalizada);

    return categoriaSeleccionada && busquedaRealizada;
  });

  const indiceUltimoUsuario = paginaActual * usuariosPorPagina;
  const indicePrimertUsuario = indiceUltimoUsuario - usuariosPorPagina;
  const usuariosActuales = filtrarUsuarios.slice(
    indicePrimertUsuario,
    indiceUltimoUsuario
  );
  const totalPaginas = Math.ceil(filtrarUsuarios.length / usuariosPorPagina);

  const handlePaginacionClick = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  return (
    <Container className="text-center px-md-5 py-md-2">
      <h2 className="my-5 disenoTitulo text-primary">Solicitar Turno</h2>

      <Form.Group className="mb-4">
        <Form.Label>Seleccione una especialidad</Form.Label>
        <Form.Select
          value={tabSeleccionada}
          onChange={handleTabSeleccionada}
          className="mx-auto"
          style={{ width: "50%" }}
        >
          <option value="">Todas</option>
          {especialidadesUnicas.map((especialidad, index) => (
            <option key={index} value={especialidad}>
              {especialidad}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Table striped hover responsive className="rounded">
        <thead>
          <tr>
            <th className="tableMaterias fw-bold text-center">Apellido</th>
            <th className="tableMaterias fw-bold text-center">Nombre</th>
            <th className="tableMaterias fw-bold text-center">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosActuales.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">
                No hay médicos disponibles.
              </td>
            </tr>
          ) : (
            usuariosActuales.map((usuario) => (
              <tr key={usuario.id}>
                <td className="tableMaterias text-center">{usuario.apellido}</td>
                <td className="tableMaterias text-center">{usuario.nombre}</td>
                <td className="tableMaterias text-center">
                  <ModalSolicitar  usuario={usuario}>Buscar Turnos</ModalSolicitar>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

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
      <hr />
      <h2 className="text-primary  mt-4">Turnos Pedidos</h2>
      {turnos.length > 0 ? (
        <Table striped hover responsive className="rounded">
          <thead>
            <tr>
              <th className="tableMaterias fw-bold">Fecha</th>
              <th className="tableMaterias fw-bold">Horario</th>
              <th className="tableMaterias fw-bold">Estado</th>
              <th className="tableMaterias fw-bold">Especialidad</th>              
              <th className="tableMaterias fw-bold">Medico</th>
              <th className="tableMaterias fw-bold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((turno) => {
              if(turno.pacienteId == user?.id && turno.estado === "Confirmado") {
              return (
                <tr key={turno.id}>
                  <td className="tableMaterias">{turno.fecha}</td>
                  <td className="tableMaterias">{turno.horario}</td>
                  <td className="tableMaterias">{turno.estado}</td>
                  <td className="tableMaterias">{turno.medicoTipo}</td>
                  <td className="tableMaterias">{turno.medicoNombre}</td>

                  <td className="tableMaterias ">
                    <div className="d-flex justify-content-center">
                      <Cancelar turno={turno}></Cancelar>
                    </div>
                  </td>
                </tr>
              );}
            })}
          </tbody>
        </Table>
      ) : (
        <p>No se encontró ningún turno que coincida con los filtros.</p>
      )}
    </Container>
    
  );
};

export default solicitarTurno;
