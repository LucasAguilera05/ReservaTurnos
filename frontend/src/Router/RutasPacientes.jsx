import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Perfil from "../pages/pacientes/Perfil";
// import Historial from "../pages/pacientes/Historial";
// import SolicitarTurno from "../pages/pacientes/SolicitarTurno";
import Sidebar from "../components/Sidebar";
import NavBarSmall from "../components/NavBarSmall";
import Header from "../components/Header";
import Error404 from "../pages/error404/Error404";
import useAuth from "../stores/Auth-Store";

const RutasPacientes = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validRoutes = [
    "/pacientes",
    "/pacientes/perfil",
    "/pacientes/historial",
    "/pacientes/solicitarTurno",
  ];

  const showSidebarAndHeader = validRoutes.includes(location.pathname);

  if (user?.rol !== "Paciente") {
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
          <Route path="/" element={<Perfil />} />
          <Route path="perfil" element={<Perfil />} />
          {/* <Route path="historial" element={<Historial />} /> */}
          {/* <Route path="solicitarTurno" element={<SolicitarTurno />} /> */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </div>
  );
};

export default RutasPacientes;
