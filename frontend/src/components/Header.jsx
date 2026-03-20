import React from "react";
import imgPerfil from "../assets/avatarPerfil.jpeg";
import { MdLogout } from "react-icons/md";
import useAuth from "../stores/Auth-Store";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Header = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesion?",
      text: "Tu sesion actual se cerrara",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#038587",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Si, cerrar sesion",
      cancelButtonText: "Cancelar",
      background: "#fff",
      customClass: {
        popup: 'rounded-3',
        title: 'fw-bold',
        confirmButton: 'rounded-2',
        cancelButton: 'rounded-2'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          title: "Sesion cerrada",
          text: "Redirigiendo al inicio...",
          icon: "success",
          timer: 1200,
          timerProgressBar: true,
          showConfirmButton: false,
          background: "#fff",
          customClass: {
            popup: 'rounded-3',
            title: 'fw-bold'
          },
          willClose: () => {
            navigate("/");
          },
        });
      }
    });
  };

  const getRoleBadgeColor = () => {
    switch (user.rol) {
      case "Administrador":
      case "administrador":
        return "#f59e0b";
      case "Medico":
        return "#10b981";
      case "Paciente":
        return "#038587";
      default:
        return "#64748b";
    }
  };

  return (
    <header className="header">
      <div className="header-user-section">
        <div className="header-user-info">
          <img src={imgPerfil} alt="Avatar de usuario" className="header-avatar" />
          <div className="header-user-details">
            <span className="header-user-name">{user.nombre || "Usuario"}</span>
            <span 
              className="header-user-role"
              style={{ color: getRoleBadgeColor() }}
            >
              {user.rol || "Sin rol"}
            </span>
          </div>
        </div>
        
        <button className="header-logout-btn" onClick={handleLogout}>
          <MdLogout className="header-logout-icon" />
          <span>Cerrar Sesion</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
