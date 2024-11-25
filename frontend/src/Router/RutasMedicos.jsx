import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import PerfilMedico from "../pages/medicos/PerfilMedico";
import ListadoPacientes from "../pages/medicos/ListadoPacientes";
// import ProgramarTurno from "../pages/medicos/ProgramarTurno";
import Sidebar from "../components/Sidebar";
import NavBarSmall from "../components/NavBarSmall";
import Header from "../components/Header";
import Error404 from "../pages/error404/Error404";
import useAuth from "../stores/Auth-Store";

const RutasMedicos = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validRoutes = [
    "/medicos",
    "/medicos/perfil",
    "/medicos/pacientes",
    "/medicos/programarTurno",
  ];

  const showSidebarAndHeader = validRoutes.includes(location.pathname);

  if (user?.rol !== "Medico") {
    return <Navigate to="/error" replace />;
  }

  return (
    <div className="d-flex flex-column flex-lg-row">
      {showSidebarAndHeader && (
        <NavBarSmall
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
        />
      )}

      {showSidebarAndHeader && (
        <div className="sidebar d-none d-lg-block">
          <Sidebar />
        </div>
      )}

      <div className={showSidebarAndHeader ? "main-content flex-grow-1" : ""}>
        {showSidebarAndHeader && <Header />}
        <Routes>
          <Route path="/" element={<PerfilMedico />} />
          <Route path="perfil" element={<PerfilMedico />} />
          {/* <Route path="programarTurno" element={<ProgramarTurno />} /> */}
          {/* <Route path="pacientes" element={<ListadoPacientes />} /> */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </div>
  );
};

export default RutasMedicos;
