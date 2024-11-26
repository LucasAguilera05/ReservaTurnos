import React, { useEffect, useState } from "react";
import { Container, Form, Table, Pagination } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { MdDelete } from "react-icons/md";
import useTurnosStore from "../../stores/Turnos-Store";
import CrearTurno from "../medicos/ModalesTurnos/CrearTurno";
import EditarTurno from "../medicos/ModalesTurnos/EditarTurno";
import useAuth from "../../stores/Auth-Store";
import useUsuarios from "../../stores/Usuarios-Store";
import { Button, Modal } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import Solicitar from "./Solicitar"

const ModalSolicitar = ({ usuario }) => {   
    
  const { turnos, obtenerTurnos, borrarTurno } = useTurnosStore();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    obtenerTurnos();
  }, []);
  return (
    <>
      <Button
        onClick={handleShow}
        variant="outline-warning"
        className="m-1 d-flex justify-content-center align-items-center flex-column"
      >
        Buscar Turnos
      </Button>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-md">
        <Modal.Header closeButton>
          <Modal.Title>Turnos Disponibles</Modal.Title>
        </Modal.Header>

      {turnos.length > 0 ? (
        <Table striped hover responsive className="rounded">
          <thead>
            <tr>
              <th className="tableMaterias fw-bold">Fecha</th>
              <th className="tableMaterias fw-bold">Horario</th>
              <th className="tableMaterias fw-bold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((turno) => {
                if(turno.medicoId === usuario.id && turno.estado === "Ninguno")              
              return (
                <tr key={turno.id}>
                  <td className="tableMaterias">{turno.fecha}</td>
                  <td className="tableMaterias">{turno.horario}</td>
                  <td className="tableMaterias ">
                    <div className="d-flex justify-content-center">                      
                      <Solicitar turno={turno}></Solicitar>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <p>No se encontró ningún turno que coincida con los filtros.</p>
      )}
      </Modal>
    </>
  );
};

export default ModalSolicitar;
