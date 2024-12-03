-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-11-2024 a las 20:39:52
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reserva_turnos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita`
--
-- Error leyendo la estructura de la tabla reserva_turnos.cita: #1932 - Table &#039;reserva_turnos.cita&#039; doesn&#039;t exist in engine
-- Error leyendo datos de la tabla reserva_turnos.cita: #1064 - Algo está equivocado en su sintax cerca &#039;FROM `reserva_turnos`.`cita`&#039; en la linea 1

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `turnos` (
  `id` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `horario` time NOT NULL,
  `medicoId` int(11) NOT NULL,
  `medicoNombre` varchar(255) DEFAULT NULL,
  `medicoTipo` varchar(255) DEFAULT NULL,
  `pacienteId` int(11) NOT NULL,
  `pacienteNombre` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita_has_paciente`
--
-- Error leyendo la estructura de la tabla reserva_turnos.cita_has_paciente: #1932 - Table &#039;reserva_turnos.cita_has_paciente&#039; doesn&#039;t exist in engine
-- Error leyendo datos de la tabla reserva_turnos.cita_has_paciente: #1064 - Algo está equivocado en su sintax cerca &#039;FROM `reserva_turnos`.`cita_has_paciente`&#039; en la linea 1

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctors`
--

CREATE TABLE `doctors` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `especialidad` varchar(255) NOT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad`
--
-- Error leyendo la estructura de la tabla reserva_turnos.especialidad: #1932 - Table &#039;reserva_turnos.especialidad&#039; doesn&#039;t exist in engine
-- Error leyendo datos de la tabla reserva_turnos.especialidad: #1064 - Algo está equivocado en su sintax cerca &#039;FROM `reserva_turnos`.`especialidad`&#039; en la linea 1

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadodecita`
--
-- Error leyendo la estructura de la tabla reserva_turnos.estadodecita: #1932 - Table &#039;reserva_turnos.estadodecita&#039; doesn&#039;t exist in engine
-- Error leyendo datos de la tabla reserva_turnos.estadodecita: #1064 - Algo está equivocado en su sintax cerca &#039;FROM `reserva_turnos`.`estadodecita`&#039; en la linea 1

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `médico`
--
-- Error leyendo la estructura de la tabla reserva_turnos.médico: #1932 - Table &#039;reserva_turnos.médico&#039; doesn&#039;t exist in engine
-- Error leyendo datos de la tabla reserva_turnos.médico: #1064 - Algo está equivocado en su sintax cerca &#039;FROM `reserva_turnos`.`médico`&#039; en la linea 1

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--
-- Error leyendo la estructura de la tabla reserva_turnos.paciente: #1932 - Table &#039;reserva_turnos.paciente&#039; doesn&#039;t exist in engine
-- Error leyendo datos de la tabla reserva_turnos.paciente: #1064 - Algo está equivocado en su sintax cerca &#039;FROM `reserva_turnos`.`paciente`&#039; en la linea 1

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `dni` varchar(255) NOT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--
-- Error leyendo la estructura de la tabla reserva_turnos.tipo_usuario: #1932 - Table &#039;reserva_turnos.tipo_usuario&#039; doesn&#039;t exist in engine
-- Error leyendo datos de la tabla reserva_turnos.tipo_usuario: #1064 - Algo está equivocado en su sintax cerca &#039;FROM `reserva_turnos`.`tipo_usuario`&#039; en la linea 1

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turno`
--
-- Error leyendo la estructura de la tabla reserva_turnos.turno: #1932 - Table &#039;reserva_turnos.turno&#039; doesn&#039;t exist in engine
-- Error leyendo datos de la tabla reserva_turnos.turno: #1064 - Algo está equivocado en su sintax cerca &#039;FROM `reserva_turnos`.`turno`&#039; en la linea 1

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--
-- Error leyendo la estructura de la tabla reserva_turnos.usuario: #1932 - Table &#039;reserva_turnos.usuario&#039; doesn&#039;t exist in engine
-- Error leyendo datos de la tabla reserva_turnos.usuario: #1064 - Algo está equivocado en su sintax cerca &#039;FROM `reserva_turnos`.`usuario`&#039; en la linea 1

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `dni` int(30) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` int(30) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `passwordConfirm` varchar(255) NOT NULL,
  `rol` varchar(255) DEFAULT 'paciente',
  `edad` int(11) DEFAULT NULL,
  `peso` int(11) DEFAULT NULL,
  `altura` DECIMAL(11) DEFAULT NULL,
  `historial` varchar(255) DEFAULT NULL,
  `sexo` varchar(255) DEFAULT NULL,
  `especialidad` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `dni`, `nombre`, `apellido`, `email`, `telefono`, `direccion`, `password`, `passwordConfirm`, `rol`, `especialidad`) VALUES
(3, 39252525, 'Andrés', 'Santamarina', 'andres@gmail.com', 3814564564, 'direccion123', '123456', '123456', 'Medico','Odontología'),
(17, 42345678, 'Federico', 'Gutiérrez', 'federico.gutierrez@gmail.com', 3819123456, 'Independencia 123', 'fede123', 'fede123', 'Medico','Odontología'),
(20, 45901234, 'Carolina', 'Vázquez', 'carolina.vazquez@gmail.com', 3819456789, 'Mitre 910', 'caro123', 'caro123', 'Medico','Odontología'),
(9, 40345678, 'Carlos', 'García', 'carlos.garcia@gmail.com', 3811234567, 'Belgrano 458', 'abcd1234', 'abcd1234', 'Medico','Pediatria'),
(18, 43567890, 'Ana', 'Moreno', 'ana.moreno@gmail.com', 3819234567, 'Libertad 456', 'ana456', 'ana456', 'Medico','Pediatria'),
(21, 46123456, 'Javier', 'Martín', 'javier.martin@gmail.com', 3819567890, 'Belgrano 112', 'javi456', 'javi456', 'Medico','Pediatria'),
(19, 44789012, 'Pablo', 'Rodríguez', 'pablo.rodriguez@gmail.com', 3819345678, 'San Lorenzo 789', 'pablo789', 'pablo789', 'Medico','Dermatologia');

INSERT INTO `usuarios` (`id`, `dni`, `nombre`, `apellido`, `email`, `telefono`, `direccion`, `password`, `passwordConfirm`, `rol`, `edad`,  `peso`, `altura`, `historial`, `sexo`) VALUES
(1, 37423893, 'Joaquin', 'Fuentes', 'joaquin@gmail.com', 3816097754, 'España 2456', '123456', '123456', 'Paciente', 22, 80, 1.80, 'En buena salud.','M');


--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `citas`
--
ALTER TABLE `turnos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dni` (`dni`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `turnos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
