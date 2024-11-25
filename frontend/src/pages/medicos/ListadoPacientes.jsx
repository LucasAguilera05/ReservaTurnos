import { Container, Form, Table} from "react-bootstrap";
import "./Medicos.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import usePacienteStore from "../../stores/Pacientes-Store";
import useMedicoStore from "../../stores/Medicos-Store";
import useAuth from "../../stores/Auth-Store";

const ListadoPacientes = () => {
  const { pacientes, obtenerPacientes } = usePacienteStore();
  const { medico, obtenerMedico } = useMedicoStore();
  const { user } = useAuth();

  const [busqueda, setBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    obtenerMedico(user.id);
    obtenerPacientes();
  }, [obtenerMedico, obtenerPacientes, user.id]);

  const normalizarTexto = (texto) => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  return (
    <>
      <Container className="text-center px-md-5 py-md-2">
        <h4 className="my-5 titulo">MIS PACIENTES</h4>

        <Form.Group className="d-flex align-items-center justify-content-center w-md-50 ms-3">
          <Form.Label className="m-0 p-2">
            <span className="fw-bold buscarPaciente">BUSCAR PACIENTE:</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre del paciente"
            className="w-50"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </Form.Group>

        <div className="my-4">
          <Form.Label>
            <span className="fw-bold buscarPaciente">FILTRAR</span>
          </Form.Label>

          <div className="container">
            {" "}
            <div className="row">            
              <div className="col">
                {" "}
                <Form.Label>
                  <span className="fw-bold buscarPaciente">AÑO</span>
                </Form.Label>
                <Form.Select
                  aria-label="Filtrar por año"
                  value={filtroAnio}
                  onChange={(e) => setFiltroAnio(e.target.value)}
                >
                  <option value="">Todos</option>
                  
                </Form.Select>
              </div>
            </div>
          </div>
        </div>

        <Table striped hover responsive className="mt-3 rounded">
          <thead>
            <tr>
              <th className="tableMaterias fw-bold">Nombre</th>
              <th className="tableMaterias fw-bold">Materia</th>
              <th className="tableMaterias fw-bold">Año</th>
              <th className="tableMaterias fw-bold">División</th>
              <th className="tableMaterias fw-bold">Asistencia</th>
              <th className="tableMaterias fw-bold">Evaluaciones</th>
              <th className="tableMaterias fw-bold">Nota final</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default ListadoPacientes;
