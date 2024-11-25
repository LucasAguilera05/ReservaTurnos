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

CREATE TABLE `citas` (
  `id` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `hora` time NOT NULL,
  `motivo` varchar(255) DEFAULT NULL,
  `idDoctor` int(11) NOT NULL,
  `idPaciente` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
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
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `rol` varchar(255) DEFAULT 'paciente',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `contraseña`, `rol`, `createdAt`, `updatedAt`) VALUES
(1, 'lucas', 'lucas@gmail.com', 'lucas', 'paciente', '2024-11-25 08:23:10', '2024-11-25 08:23:10'),
(2, 'lucas', 'lucaas@gmail.com', '$2a$10$b.kKZu8Od6M5RFh2eusi4eychQn1kta66DIwtRnTWAyjQwXYFeEr2', 'paciente', '2024-11-25 07:32:56', '2024-11-25 07:32:56'),
(3, 'alejo', 'alejo@gmail.com', '$2a$10$BFGj6SnAyPRf1FNT2fleduRjqlfiY62LuQ4y2w/FYbbILc7KOo41S', 'doctor', '2024-11-25 19:30:57', '2024-11-25 19:30:57');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
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
ALTER TABLE `citas`
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
