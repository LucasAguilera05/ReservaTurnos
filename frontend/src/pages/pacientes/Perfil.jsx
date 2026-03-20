import React, { useEffect } from "react";
import avatar from "../../assets/avatarPerfil.jpeg";
import { Container, Row, Col } from "react-bootstrap";
import "./Pacientes.css";
import useAuth from "../../stores/Auth-Store";
import useUsuarios from "../../stores/Usuarios-Store";
import { FaIdCard, FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaHospitalUser } from "react-icons/fa";

const Perfil = () => {
  const { user } = useAuth((state) => ({ user: state.user }));
  const { usuario, getUsuarioById } = useUsuarios((state) => ({
    usuario: state.usuario,
    getUsuarioById: state.getUsuarioById,
  }));

  useEffect(() => {
    if (user?.id) {
      getUsuarioById(user.id);
    }
  }, [user?.id, getUsuarioById]);

  const profileData = [
    { icon: <FaIdCard />, label: "DNI", value: usuario?.pacienteData?.dni || "-" },
    { icon: <FaUser />, label: "Nombre Completo", value: `${usuario?.pacienteData?.nombre || ""} ${usuario?.pacienteData?.apellido || ""}`.trim() || "-" },
    { icon: <FaEnvelope />, label: "Correo Electronico", value: usuario?.email || "-" },
    { icon: <FaMapMarkerAlt />, label: "Direccion", value: usuario?.pacienteData?.direccion || "-" },
    { icon: <FaPhone />, label: "Telefono", value: usuario?.pacienteData?.telefono || "-" },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Mi Perfil</h1>
        <p className="page-subtitle">Informacion personal del paciente</p>
      </div>

      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="profile-card-modern animate-fadeInUp">
            <div className="profile-header">
              <img src={avatar} alt="Avatar del paciente" className="profile-avatar" />
              <h2 className="profile-name">
                {usuario?.pacienteData?.nombre} {usuario?.pacienteData?.apellido}
              </h2>
              <span className="profile-role">
                <FaHospitalUser className="me-1" />
                Paciente
              </span>
            </div>
            
            <div className="profile-body">
              {profileData.map((item, index) => (
                <div key={index} className="profile-info-item">
                  <span className="profile-info-label">
                    <span className="me-2" style={{ color: 'var(--color-primarioDos)' }}>{item.icon}</span>
                    {item.label}
                  </span>
                  <span className="profile-info-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Perfil;
