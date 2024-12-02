import React, { useEffect, useState } from "react";
import { Container, Form, Table, Pagination, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useTurnosStore from "../../stores/Turnos-Store";
import CrearTurno from "../medicos/ModalesTurnos/CrearTurno";
import EditarTurno from "../medicos/ModalesTurnos/EditarTurno";
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

  const [tabSeleccionada, setTabSeleccionada] = useState("Todos");
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

  const filtrarUsuarios = usuarios.filter((usuario) => {
    const busquedaNormalizada = normalizarTexto(busqueda);
    const nombreNormalizado = normalizarTexto(usuario.nombre);
    const apellidoNormalizado = normalizarTexto(usuario.apellido);
    const categoriaSeleccionada =
      tabSeleccionada === usuario.especialidad ;
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

  const eliminarTurno = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await borrarTurno(id);
          Swal.fire("Eliminado", "El turno ha sido eliminado.", "success");
        } catch (error) {
          Swal.fire(
            "Error",
            error.message || "No se pudo eliminar el turno.",
            "error"
          );
        }
      }
    });
  };

  

  return (
    <Container className="text-center px-md-5 py-md-2">
      <h2 className="my-5 disenoTitulo text-primary">Solicitar Turno</h2>

      <Nav
        variant="tabs"
        defaultActiveKey="/home"
        className="mt-4 mb-1 tabsRoles"
        onSelect={(key) => handleTabSeleccionada(key)}
      >
        <Nav.Item>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Odontología" active={tabSeleccionada === "Odontología"}>
          Odontología
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Pediatria" active={tabSeleccionada === "Pediatria"}>
          Pediatria
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Dermatologia" active={tabSeleccionada === "Dermatologia"}>
          Dermatologia
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Table striped hover responsive className="rounded">
        <thead>
          <tr>
            <th className="tableMaterias fw-bold">Apellido</th>
            <th className="tableMaterias fw-bold">Nombre</th>
            <th className="tableMaterias fw-bold">Telefono</th>
            <th className="tableMaterias fw-bold">Correo</th>
            <th className="tableMaterias fw-bold">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosActuales.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                Debe seleccionar una especialidad.
              </td>
            </tr>
          ) : (
            usuariosActuales.map((usuario) => (
              <tr key={usuario.id}>
                <td className="tableMaterias">{usuario.apellido}</td>
                <td className="tableMaterias">{usuario.nombre}</td>
                <td className="tableMaterias">{usuario.telefono}</td>
                <td className="tableMaterias">{usuario.email}</td>
                <td className="tableMaterias">
                  <ModalSolicitar usuario={usuario}>Buscar Turnos</ModalSolicitar>
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
              if(turno.pacienteId === user?.id && turno.estado === "Confirmado") {
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