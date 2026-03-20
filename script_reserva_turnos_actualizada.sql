-- phpMyAdmin SQL Dump
-- Base de datos: `reserva_turnos`
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Estructura de tabla para la tabla `pacientes`
CREATE TABLE IF NOT EXISTS `pacientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dni` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `peso` int(11) DEFAULT NULL,
  `altura` decimal(10,2) DEFAULT NULL,
  `sexo` varchar(255) DEFAULT NULL,
  `historial` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla `pacientes`
INSERT INTO `pacientes` (`id`, `dni`, `nombre`, `apellido`, `telefono`, `direccion`, `edad`, `peso`, `altura`, `sexo`, `historial`) VALUES
(1, '37423893', 'Joaquin', 'Fuentes', '2147483647', 'España 2456', 22, 80, 2.00, 'M', 'En buena salud.'),
(2, '44070121', 'pato', 'cattolica', '381645210', 'aldt', 25, 78, NULL, 'Masculino', NULL),
(3, '1353672721', 'Martin ', 'Martinez', '2147483647', 'Santiago del Estero', 25, NULL, NULL, NULL, NULL),
(4, '42467047', 'Patricio', 'Cattolica', '2147483647', 'Rincon del este Q 16', 25, NULL, NULL, NULL, NULL),
(5, '27917641', 'Nancy', 'Aguilera', '2147483647', 'Pellegrini', 44, NULL, NULL, NULL, NULL),
(6, '2', 'Facu', 'Facu', '3388', 'Haha', 22, NULL, NULL, NULL, NULL);

-- Estructura de tabla para la tabla `medicos`
CREATE TABLE IF NOT EXISTS `medicos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dni` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `especialidad` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla `medicos`
INSERT INTO `medicos` (`id`, `dni`, `nombre`, `apellido`, `telefono`, `direccion`, `especialidad`) VALUES
(1, '39252525', 'Andrés', 'Santamarina', '2147483647', 'direccion123', 'Odontología'),
(2, '40345678', 'Carlos', 'García', '2147483647', 'Belgrano 458', 'Pediatria'),
(3, '42345678', 'Federico', 'Gutiérrez', '2147483647', 'Independencia 123', 'Odontología'),
(4, '43567890', 'Ana', 'Moreno', '2147483647', 'Libertad 456', 'Pediatria'),
(5, '44789012', 'Pablo', 'Rodríguez', '2147483647', 'San Lorenzo 789', 'Dermatologia'),
(6, '45901234', 'Carolina', 'Vázquez', '2147483647', 'Mitre 910', 'Odontología'),
(7, '46123456', 'Javier', 'Martín', '2147483647', 'Belgrano 112', 'Pediatria');

-- Estructura de tabla para la tabla `administradores`
CREATE TABLE IF NOT EXISTS `administradores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dni` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla `administradores`
INSERT INTO `administradores` (`id`, `dni`, `nombre`, `apellido`, `telefono`, `direccion`) VALUES
(1, '44070121', 'lucas', 'aguilera', '2147483647', 'direccion123'),
(2, '892456', 'juan', 'aguilera', '894584231', 'balcarce');

-- Estructura de tabla para la tabla `usuarios`
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `passwordConfirm` varchar(255) NOT NULL,
  `rol` varchar(255) DEFAULT 'Paciente',
  `pacienteId` int(11) DEFAULT NULL,
  `medicoId` int(11) DEFAULT NULL,
  `adminId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usuario_paciente_idx` (`pacienteId`),
  KEY `fk_usuario_medico_idx` (`medicoId`),
  KEY `fk_usuario_admin_idx` (`adminId`),
  CONSTRAINT `fk_usuario_paciente` FOREIGN KEY (`pacienteId`) REFERENCES `pacientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_usuario_medico` FOREIGN KEY (`medicoId`) REFERENCES `medicos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_usuario_admin` FOREIGN KEY (`adminId`) REFERENCES `administradores` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla `usuarios`
INSERT INTO `usuarios` (`id`, `email`, `password`, `passwordConfirm`, `rol`, `pacienteId`, `medicoId`, `adminId`) VALUES
(1, 'joaquin@gmail.com', '123456', '123456', 'Paciente', 1, NULL, NULL),
(3, 'andres@gmail.com', '123456', '123456', 'Medico', NULL, 1, NULL),
(9, 'carlos.garcia@gmail.com', 'abcd1234', 'abcd1234', 'Medico', NULL, 2, NULL),
(17, 'federico.gutierrez@gmail.com', 'fede123', 'fede123', 'Medico', NULL, 3, NULL),
(18, 'ana.moreno@gmail.com', 'ana456', 'ana456', 'Medico', NULL, 4, NULL),
(19, 'pablo.rodriguez@gmail.com', 'pablo789', 'pablo789', 'Medico', NULL, 5, NULL),
(20, 'carolina.vazquez@gmail.com', 'caro123', 'caro123', 'Medico', NULL, 6, NULL),
(21, 'javier.martin@gmail.com', 'javi456', 'javi456', 'Medico', NULL, 7, NULL),
(25, 'lucas@gmail.com', '123456', '123456', 'Administrador', NULL, NULL, 1),
(26, 'pato@gmail.com', '123456', '123456', 'Paciente', 2, NULL, NULL),
(28, 'ad@gmail.com', '123456', '123456', 'Médico', NULL, NULL, NULL),
(29, 'natin@gmail.com', '123456', '123456', 'Paciente', 3, NULL, NULL),
(30, 'patriciocattolica@gmail.com', 'alderetes1', 'alderetes1', 'Paciente', 4, NULL, NULL),
(31, 'nancyaguilera1505@gmail.com', 'Solana150512', 'Solana150512', 'Paciente', 5, NULL, NULL),
(32, 'vah@kaj', '222222', '222222', 'Paciente', 6, NULL, NULL),
(33, 'agus@gmail.com', '123456', '123456', 'Médico', NULL, NULL, NULL),
(34, 'juan@gmail.com', '123456', '123456', 'Administrador', NULL, NULL, 2);

-- Estructura de tabla para la tabla `turnos`
CREATE TABLE IF NOT EXISTS `turnos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` varchar(255) NOT NULL,
  `horario` varchar(255) NOT NULL,
  `medicoId` varchar(255) NOT NULL,
  `medicoNombre` varchar(255) NOT NULL,
  `medicoTipo` varchar(255) NOT NULL,
  `pacienteId` varchar(255) DEFAULT 'Ninguno',
  `pacienteNombre` varchar(255) DEFAULT 'Ninguno',
  `estado` varchar(255) DEFAULT 'Pendiente',
  `diagnostico` text DEFAULT NULL,
  `tratamiento` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla `turnos`
INSERT INTO `turnos` (`id`, `fecha`, `horario`, `medicoId`, `medicoNombre`, `medicoTipo`, `pacienteId`, `pacienteNombre`, `estado`, `diagnostico`, `tratamiento`) VALUES
(1, '2025-07-25', '18:00', '3', 'Andrés Santamarina', 'Odontología', '31', 'Nancy Aguilera', 'Finalizado', NULL, NULL),
(2, '2025-07-19', '20:30', '3', 'Andrés Santamarina', 'Odontología', '26', 'pato cattolica', 'Confirmado', NULL, NULL),
(3, '2025-07-26', '09:55', '3', 'Andrés Santamarina', 'Odontología', '26', 'pato cattolica', 'Confirmado', NULL, NULL),
(9, '2026-03-17', '10:53', '3', 'Andrés Santamarina', 'Odontología', '26', 'pato cattolica', 'Completado', 'migraña', 'paracetamol cada 8hs
'),
(10, '2026-03-18', '11:03', '3', 'Andrés Santamarina', 'Odontología', '26', 'pato cattolica', 'Completado', 'amigdalas', 'antibioticos cada 8hs
');

COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
