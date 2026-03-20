-- --------------------------------------------------------
-- Base de datos: `reserva_turnos` (Estructura Limpia y Optimizada)
-- --------------------------------------------------------

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------
-- 1. Estructura y datos de la tabla `usuarios`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dni` int(30) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` bigint(20) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `passwordConfirm` varchar(255) NOT NULL,
  `rol` varchar(255) DEFAULT 'Paciente',
  `edad` int(11) DEFAULT NULL,
  `peso` int(11) DEFAULT NULL,
  `altura` DECIMAL(11,2) DEFAULT NULL,
  `historial` TEXT DEFAULT NULL,
  `sexo` varchar(255) DEFAULT NULL,
  `especialidad` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `dni` (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcado de datos esenciales para la tabla `usuarios`
INSERT INTO `usuarios` (`id`, `dni`, `nombre`, `apellido`, `email`, `telefono`, `direccion`, `password`, `passwordConfirm`, `rol`, `especialidad`, `edad`, `peso`, `altura`, `historial`, `sexo`) VALUES
(1, 37423893, 'Joaquin', 'Fuentes', 'joaquin@gmail.com', 3816097754, 'España 2456', '123456', '123456', 'Paciente', NULL, 22, 80, 1.80, 'En buena salud. Sin alergias conocidas.', 'M'),
(3, 39252525, 'Andrés', 'Santamarina', 'andres@gmail.com', 3814564564, 'direccion123', '123456', '123456', 'Medico', 'Odontología', NULL, NULL, NULL, NULL, NULL),
(9, 40345678, 'Carlos', 'García', 'carlos.garcia@gmail.com', 3811234567, 'Belgrano 458', 'abcd1234', 'abcd1234', 'Medico', 'Pediatria', NULL, NULL, NULL, NULL, NULL),
(17, 42345678, 'Federico', 'Gutiérrez', 'federico.gutierrez@gmail.com', 3819123456, 'Independencia 123', 'fede123', 'fede123', 'Medico', 'Odontología', NULL, NULL, NULL, NULL, NULL),
(18, 43567890, 'Ana', 'Moreno', 'ana.moreno@gmail.com', 3819234567, 'Libertad 456', 'ana456', 'ana456', 'Medico', 'Pediatria', NULL, NULL, NULL, NULL, NULL),
(19, 44789012, 'Pablo', 'Rodríguez', 'pablo.rodriguez@gmail.com', 3819345678, 'San Lorenzo 789', 'pablo789', 'pablo789', 'Medico', 'Dermatologia', NULL, NULL, NULL, NULL, NULL),
(20, 45901234, 'Carolina', 'Vázquez', 'carolina.vazquez@gmail.com', 3819456789, 'Mitre 910', 'caro123', 'caro123', 'Medico', 'Odontología', NULL, NULL, NULL, NULL, NULL),
(21, 46123456, 'Javier', 'Martín', 'javier.martin@gmail.com', 3819567890, 'Belgrano 112', 'javi456', 'javi456', 'Medico', 'Pediatria', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------
-- 2. Estructura de la tabla `turnos`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `turnos`;
CREATE TABLE `turnos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` varchar(255) NOT NULL,
  `horario` varchar(255) NOT NULL,
  `medicoId` int(11) NOT NULL,
  `medicoNombre` varchar(255) DEFAULT NULL,
  `medicoTipo` varchar(255) DEFAULT NULL,
  `pacienteId` varchar(255) DEFAULT 'Ninguno',
  `pacienteNombre` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `diagnostico` TEXT DEFAULT NULL,
  `tratamiento` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
