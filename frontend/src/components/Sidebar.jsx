import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { FaClipboardList, FaCalendarPlus, FaUsersCog, FaHome, FaUserMd, FaCalendarAlt } from "react-icons/fa";
import { MdHistory } from "react-icons/md";

import logo from "../assets/logo2.png";

const Sidebar = ({ handleClose }) => {
  const [userSession, setUserSession] = useState({});

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("usuario"));
    setUserSession(user);
  }, []);

  const navItems = {
    Paciente: [
      { to: "/pacientes/perfil", icon: <ImProfile />, label: "Mi Perfil" },
      { to: "/pacientes/historial", icon: <MdHistory />, label: "Historial Clinico" },
      { to: "/pacientes/solicitarTurno", icon: <FaCalendarPlus />, label: "Solicitar Turno" },
    ],
    Medico: [
      { to: "/medicos/perfil", icon: <ImProfile />, label: "Mi Perfil" },
      { to: "/medicos/pacientes", icon: <FaClipboardList />, label: "Historial Pacientes" },
      { to: "/medicos/programarTurno", icon: <FaCalendarAlt />, label: "Programar Turnos" },
    ],
    Administrador: [
      { to: "/Administrador/PanelAdmin/", icon: <FaHome />, label: "Dashboard" },
      { to: "/Administrador/PanelAdmin/Perfil", icon: <ImProfile />, label: "Mi Perfil" },
      { to: "/Administrador/PanelAdmin/Usuarios", icon: <FaUsersCog />, label: "Gestionar Usuarios" },
    ],
  };

  const getRoleItems = () => {
    if (userSession.rol === "Paciente") return navItems.Paciente;
    if (userSession.rol === "Medico") return navItems.Medico;
    if (userSession.rol === "administrador" || userSession.rol === "Administrador") return navItems.Administrador;
    return [];
  };

  const getRoleIcon = () => {
    if (userSession.rol === "Paciente") return <ImProfile />;
    if (userSession.rol === "Medico") return <FaUserMd />;
    return <FaUsersCog />;
  };

  return (
    <div className="sidebar text-center d-flex flex-column">
      <div className="sidebar-content">
        <div className="sidebar-logo-container">
          <img src={logo} alt="Logo Sistema" className="logoSidebar" />
          <p className="sidebar-brand">Sistema de Citas Medicas</p>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="navbar-nav w-100">
            {getRoleItems().map((item, index) => (
              <li key={index} className="sidebar-nav-item">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `sidebar-nav-link ${isActive ? "active" : ""}`
                  }
                  onClick={handleClose}
                >
                  <span className="sidebar-nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <footer className="sidebar-footer">
        <p className="sidebar-footer-title">Sistema de Gestion de Citas</p>
        <p className="sidebar-footer-subtitle">Desarrollado por Lucas Aguilera</p>
        <p className="sidebar-footer-copy">Todos los derechos reservados &copy; 2024</p>
      </footer>
    </div>
  );
};

export default Sidebar;
