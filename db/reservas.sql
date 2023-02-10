-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-02-2023 a las 14:34:54
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reservas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE `horarios` (
  `id_horario` int(2) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_final` date NOT NULL,
  `hora_inicial` time NOT NULL,
  `ampmInicial` varchar(4) NOT NULL,
  `hora_final` time NOT NULL,
  `ampmFinal` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `horarios`
--

INSERT INTO `horarios` (`id_horario`, `fecha_inicio`, `fecha_final`, `hora_inicial`, `ampmInicial`, `hora_final`, `ampmFinal`) VALUES
(1, '2023-02-09', '2023-02-10', '08:00:00', 'am', '05:00:00', 'pm');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id_cita` int(3) NOT NULL,
  `nombre_usuario` varchar(85) NOT NULL,
  `documento` int(15) NOT NULL,
  `correo` varchar(140) NOT NULL,
  `celular` int(10) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `ampm` varchar(2) NOT NULL,
  `nota` text CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `estado` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id_cita`, `nombre_usuario`, `documento`, `correo`, `celular`, `fecha`, `hora`, `ampm`, `nota`, `estado`) VALUES
(31, 'Daniel Sanjuan', 1044612757, 'thomasdanieljose@outlook.com', 2147483647, '2023-02-09', '07:30:00', 'pm', '', 'Rechazada'),
(32, 'Daniel Sanjuan', 1044612757, 'thomasdanieljose@outlook.com', 2147483647, '2023-02-23', '02:30:00', 'pm', '', 'Rechazada'),
(38, 'Daniel Sanjuan', 1044612757, 'thomasdanieljose@outlook.com', 2147483647, '2023-02-09', '03:30:00', 'pm', '', 'Reprogramada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(2) NOT NULL,
  `nombre_usuario` varchar(85) NOT NULL,
  `tipo_documento` varchar(4) NOT NULL,
  `documento` int(15) NOT NULL,
  `correo` varchar(120) NOT NULL,
  `celular` int(10) NOT NULL,
  `contraseña` varchar(15) NOT NULL,
  `tipo_usuario` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre_usuario`, `tipo_documento`, `documento`, `correo`, `celular`, `contraseña`, `tipo_usuario`) VALUES
(7, 'Daniel Sanjuan', 'TI', 1044612757, 'thomasdanieljose@outlook.com', 2147483647, '72255228Zp', 'natural'),
(8, 'Marcelo Thomas', 'CC', 72255228, 'marceloThomas@gmail.com', 2147483647, 'hola123', 'admin'),
(10, 'elvia thomas', 'CC', 32867533, 'elviaydd@hotmail.com', 2147483647, 'daniel07', 'natural');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`id_horario`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id_cita`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `id_horario` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id_cita` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
