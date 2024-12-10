import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdSchool } from "react-icons/io";
import { LiaSchoolSolid } from "react-icons/lia";
import { IoNewspaper } from "react-icons/io5";
import { BiSolidMessageAltDetail } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import { IoSchool } from "react-icons/io5";
import { FaClipboardCheck } from "react-icons/fa6";

import logo from "../assets/logo2.png";

const Sidebar = ({ handleClose }) => {
  const [userSession, setUserSession] = useState({});

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("usuario"));
    setUserSession(user);
  }, []);

  return (
    <div className="sidebar text-center d-flex flex-column">
      <div className="sidebar-content flex-grow-1">
        <img src={logo} alt="imagen logo" className="logoSidebar my-4" />
        <nav className="navbar w-100 p-0">
          {userSession.rol === "Paciente" && (
            <ul className="navbar-nav w-100">
              <li className="nav-item text-center">
                <NavLink
                  to="/pacientes/perfil"
                  className="nav-link text-light fw-bold btnSidebar py-3 d-flex justify-content-center align-items-center"
                  onClick={handleClose}
                >
                  <ImProfile className="me-2" />
                  Perfil
                </NavLink>
              </li>
             
              <li className="nav-item text-center">
                <NavLink
                  to="/pacientes/solicitarTurno"
                  className="nav-link text-light fw-bold btnSidebar py-3 d-flex justify-content-center align-items-center"
                  onClick={handleClose}
                >
                  <IoMdSchool className="me-2" />
                  Solicitar Turno
                </NavLink>
              </li>
            </ul>
          )}

          {userSession.rol === "Medico" && (
            <ul className="navbar-nav w-100">
              <li className="nav-item text-center">
                <NavLink
                  to="/medicos/perfil"
                  className="nav-link text-light fw-bold btnSidebar py-3 d-flex justify-content-center align-items-center"
                  onClick={handleClose}
                >
                  <ImProfile className="me-2" />
                  Perfil
                </NavLink>
              </li>
              <li className="nav-item text-center">
                <NavLink
                  to="/medicos/pacientes"
                  className="nav-link text-light fw-bold btnSidebar py-3 d-flex justify-content-center align-items-center"
                  onClick={handleClose}
                >
                  <LiaSchoolSolid className="me-2" />
                  Solicitar Historial Clinico
                </NavLink>
              </li>
              <li className="nav-item text-center">
                <NavLink
                  to="/medicos/programarTurno"
                  className="nav-link text-light fw-bold btnSidebar py-3 d-flex justify-content-center align-items-center"
                  onClick={handleClose}
                >
                  <LiaSchoolSolid className="me-2" />
                  Programar Turnos
                </NavLink>
              </li>
            </ul>
          )}
        </nav>
      </div>
      <footer className="bg-dark py-3">
        <p className="tituloFooter">Sistema de Gestión Citas</p>
        <p className="tituloFooter">Grupo 1 - Diseño de Sistemas 2024</p>
        <p className="copyFooter">Todos los derechos reservados &copy;</p>
      </footer>
    </div>
  );
};

export default Sidebar;
