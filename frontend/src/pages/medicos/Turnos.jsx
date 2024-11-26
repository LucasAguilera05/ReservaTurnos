import React, { useEffect, useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
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

  useEffect(() => {
    obtenerTurnos();
    if (user?.id) {
      getUsuarioById(user.id);
    }
    getUsuarios();
  }, [user?.id, getUsuarioById, getUsuarios]);

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
      <hr />
      <h2 className="text-primary">Turnos Disponibles</h2>

      {turnos.length > 0 ? (
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
            {turnos.map((turno) => {
              if(turno.estado === "Ninguno" && turno.medicoId == user?.id) {
              return (
                <tr key={turno.id}>
                  <td className="tableMaterias">{turno.fecha}</td>
                  <td className="tableMaterias">{turno.horario}</td>
                  <td className="tableMaterias">{turno.estado}</td>
                  <td className="tableMaterias">{turno.pacienteId}</td>
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
              );}
            })}
          </tbody>
        </Table>
      ) : (
        <p>No se encontró ningún turno que coincida con los filtros.</p>
      )}

<hr />
      <h2 className="text-primary  mt-4">Turnos Confirmados</h2>
      {turnos.length > 0 ? (
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
            {turnos.map((turno) => {
              if(turno.estado === "Confirmado" && turno.medicoId == user?.id) {
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
              );}
            })}
          </tbody>
        </Table>
      ) : (
        <p>No se encontró ningún turno que coincida con los filtros.</p>
      )}

<hr />
      <h2 className="text-primary  mt-4">Turnos Finalizados</h2>
      {turnos.length > 0 ? (
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
            {turnos.map((turno) => {
              if(turno.estado === "Finalizado" && turno.medicoId == user?.id) {
                
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

export default Turnos;
