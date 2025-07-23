import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PanelAdmin from "../pages/home/Administrador/PanelAdmin";
import Sidebar from "../components/Sidebar";
import NavBarSmall from "../components/NavBarSmall";
import Header from "../components/Header";
import useAuth from "../stores/Auth-Store";
import PerfilAdmin from "../pages/home/Administrador/PerfilAdmin";
import AdminUsuarios from "../pages/home/Administrador/AdminUsuarios";


const RutasAdmin = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Actualizamos la lista de rutas válidas
  const validRoutes = ["/", "/admin"]; // Asegúrate de que las rutas coincidan con las definidas en el router principal.

  const showSidebarAndHeader = validRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="d-flex flex-column flex-lg-row">
      {/* NavBarSmall */}
      {showSidebarAndHeader && (
        <NavBarSmall
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
        />
      )}

      {/* Sidebar */}
      {showSidebarAndHeader && (
        <div className="sidebar d-none d-lg-block">
          <Sidebar />
        </div>
      )}

      {/* Main content */}
      <div className="main-content flex-grow-1">
        {showSidebarAndHeader && <Header />}

        {/* Contenido dinámico basado en las rutas */}
        <Routes>
          <Route path="/" element={<PanelAdmin />} />
          <Route path="/Perfil" element={<PerfilAdmin />} />
          <Route path="/Usuarios" element={<AdminUsuarios />} />

        </Routes>
      </div>
    </div>
  );
};

export default RutasAdmin;
