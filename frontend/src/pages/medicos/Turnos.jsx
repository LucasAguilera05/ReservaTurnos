import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  NavbarBrand,
  Pagination,
  Table,
} from "react-bootstrap";
import useTurnosStore from "../../stores/Turnos-Store";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import CrearTurno from "./ModalesTurnos/CrearTurno";
import EditarTurno from "./ModalesTurnos/EditarTurno";
import useAuth from "../../stores/Auth-Store";
import useUsuarios from "../../stores/Usuarios-Store";

const Turnos = () => {
  const usuarios = useUsuarios((state) => state.usuarios || []);
  const getUsuarios = useUsuarios((state) => state.getUsuarios);
  const { user } = useAuth((state) => ({ user: state.user }));
  const { usuario, getUsuarioById } = useUsuarios((state) => ({
    usuario: state.usuario,
    getUsuarioById: state.getUsuarioById,
  }));
  const { turnos, obtenerTurnos, borrarTurno } = useTurnosStore();
  
  const hoy = new Date(); // Obtiene la fecha actual

  const dia = String(hoy.getDate()).padStart(2, '0');
  const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
  const anio = hoy.getFullYear();
  const fecha = `${anio}-${mes}-${dia}`;
  console.log(fecha)

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
    const fechaNormalizado = normalizarTexto(turno.fecha);
    const horarioTipoNormalizado = normalizarTexto(turno.horario);
    const categoriaSeleccionada = tabSeleccionada === "Hoy" || tabSeleccionada === turno.estado || tabSeleccionada === turno.fecha;
    // const fechaSeleccionada = tabFechaSelecciona === turno.fecha;
    const busquedaRealizada =
      fechaNormalizado.toLowerCase().includes(busquedaNormalizada) ||
      horarioNormalizado.toLowerCase().includes(busquedaNormalizada);

    return categoriaSeleccionada && busquedaRealizada;
  });

  const indiceUltimoTurno = paginaActual * turnosPorPagina;

  const indicePrimerTurno = indiceUltimoTurno - turnosPorPagina;

  const turnosActuales = filtrarTurnos.slice(
    indicePrimerTurno,
    indiceUltimoTurno
  );

  const totalPaginas = Math.ceil(filtrarTurnos.length / turnosPorPagina);

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
      <h2 className="my-5 disenoTitulo text-primary">Mis Turnos</h2>

      <div className="my-2 d-flex justify-content-start">
        <CrearTurno></CrearTurno>
      </div>

      <Nav
        variant="tabs"
        defaultActiveKey="/home"
        className="mt-4 mb-1 tabsRoles"
        onSelect={(key) => handleTabSeleccionada(key)}
      >
      <Nav.Item>
      </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey={fecha}
            active={tabSeleccionada === fecha}
          >
            Hoy
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="Ninguno"
            active={tabSeleccionada === "Ninguno"}
          >
            Disponibles
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="Confirmado"
            active={tabSeleccionada === "Confirmado"}
          >
            Confirmados
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="Finalizado"
            active={tabSeleccionada === "Finalizado"}
          >
            Finalizados
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Table striped hover responsive className="rounded">
        <thead>
          <tr>
            <th className="tableMaterias fw-bold">Fecha</th>
            <th className="tableMaterias fw-bold">Horario</th>
            <th className="tableMaterias fw-bold">Estado</th>
            <th className="tableMaterias fw-bold">Paciente</th>
            <th className="tableMaterias fw-bold">Acciones</th>
          </tr>
        </thead>
        <tbody>
        {turnosActuales.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                Debe seleccionar una especialidad.
              </td>
            </tr>
          ) : (
            turnosActuales.map((turno) => {
              if (turno.medicoId == user?.id) {
                return (
                  <tr key={turno.id}>
                    <td className="tableMaterias">{turno.fecha}</td>
                    <td className="tableMaterias">{turno.horario}</td>
                    <td className="tableMaterias">{turno.estado}</td>
                    <td className="tableMaterias">{turno.pacienteNombre}</td>
                    <td className="tableMaterias ">
                      <div className="d-flex justify-content-center">
                        <Button
                          variant="outline-danger"
                          className="m-1 d-flex justify-content-center align-items-center flex-column"
                          onClick={() => eliminarTurno(turno.id)}
                        >
                          <MdDelete />
                        </Button>
                        <EditarTurno turno={turno}></EditarTurno>
                      </div>
                    </td>
                  </tr>
                );
              }
            })
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
    </Container>
  );
};

export default Turnos;
