-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-06-2024 a las 18:18:37
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `instrumento`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_instrumento`
--

CREATE TABLE `categoria_instrumento` (
  `id` bigint(20) NOT NULL,
  `denominacion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria_instrumento`
--

INSERT INTO `categoria_instrumento` (`id`, `denominacion`) VALUES
(1, 'Cuerda'),
(2, 'Viento'),
(3, 'Percusion'),
(4, 'Teclado'),
(5, 'Electronico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instrumento`
--

CREATE TABLE `instrumento` (
  `id` varchar(255) NOT NULL,
  `cantidad_vendida` varchar(255) DEFAULT NULL,
  `costo_envio` varchar(255) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `instrumento` varchar(255) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `modelo` varchar(255) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `categoria_id` bigint(20) DEFAULT NULL,
  `eliminado` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `instrumento`
--

INSERT INTO `instrumento` (`id`, `cantidad_vendida`, `costo_envio`, `descripcion`, `imagen`, `instrumento`, `marca`, `modelo`, `precio`, `categoria_id`, `eliminado`) VALUES
('1', '28', 'G', 'Estas viendo una excelente mandolina de la marca Stagg, con un sonido muy dulce, tapa aros y fondo de tilo, y diapasón de palisandro. Es un instrumento acústico (no se enchufa) de cuerdas dobles (4 pares) con la caja ovalada y cóncava, y el mástil corto. Su utilización abarca variados ámbitos, desde rock, folk, country y ensambles experimentales.', 'nro10.jpg', 'Mandolina Instrumento Musical Stagg Sunburst', 'Stagg', 'M20', 2800, 1, b'0'),
('10', '380', '250', 'DESCRIPCIÓN: DE 1 A 3 AÑOS. EL SET INCLUYE 5 TAMBORES, PALILLOS Y EL PLATILLO TAL CUAL LAS FOTOS. SONIDOS REALISTAS Y FÁCIL DE MONTAR. MEDIDAS: 40X20X46 CM', 'nro5.jpg', 'Batería Musical Infantil Juguete Niño 9 Piezas Palillos ', 'Bateria', 'Infantil', 1000, 3, b'0'),
('2', '10', '150', '1 Pandereta - 32 sonajas metálicas. Más de 8 años vendiendo con 100 % de calificaciones POSITIVAS y clientes satisfechos !! ', 'nro9.jpg', 'Pandereta Pandero Instrumento Musical ', 'DyM ventas', '32 sonajas', 325, 3, b'0'),
('243', '10', 'G', 'Bajo Fender Sunburst', 'nro11.jpg', 'Bajo', 'Fender', 'Sunburst', 1900, 1, b'0'),
('3', '3', '250', 'Triangulo Musical de 24 Centímetros De Acero. ENVIOS POR CORREO O ENCOMIENDA: Se le deberán adicionar $40 en concepto de Despacho y el Costo del envío se abonará al recibir el producto en Terminal, Sucursal OCA o Domicilio', 'nro8.jpg', 'Triangulo Musical 24 Cm Percusion', 'LBP', '24', 260, 3, b'0'),
('4', '2', 'G', 'BARCHIME CORTINA MUSICAL DE 25 BARRAS LATIN CUSTOM. Emitimos factura A y B', 'nro7.jpg', 'Bar Chimes Lp Cortina Musical 72 Barras ', 'FM', 'LATIN', 2250, 2, b'0'),
('5', '5', '300', 'Las calabazas utilizadas para nuestras artesanías son sembradas y cosechadas por nosotros, quienes seleccionamos el mejor fruto para garantizar la calidad del producto y ofrecerle algo creativo y original.', 'nro6.jpg', 'Shekeres. Instrumento. Música. Artesanía. ', 'Azalea Artesanías', 'Cuentas de madera', 850, 3, b'0'),
('6', '0', '2000', 'Buen dia! Sale a la venta este Piano Alemán Neumeyer con candelabros incluidos. Tiene una talla muy bonita en la madera. Una pieza de calidad.', 'nro3.jpg', 'Antiguo Piano Aleman Con Candelabros. ', 'Neumeyer', 'Stratus', 17000, 4, b'0'),
('7', '5', 'G', 'Material: Plástico smil madera 4 Cuerdas longitud: 60cm, el mejor regalo para usted, su familia y amigos, adecuado para 3-18 años de edad', 'nro4.jpg', 'Guitarra Ukelele Infantil Grande 60cm', 'GUITARRA', 'UKELELE', 500, 1, b'0'),
('8', '1375', 'G', 'Organo Electrónico GADNIC T01. Display de Led. 54 Teclas. 100 Timbres / 100 Ritmos. 4 1/2 octavas. 8 Percusiones. 8 Canciones de muestra. Grabación y reproducción. Entrada para Micrófono. Salida de Audio (Auriculares / Amplificador). Vibrato. Sustain Incluye Atril Apoya partitura y Micrófono. Dimensiones: 84,5 x 32,5 x 11 cm', 'nro2.jpg', 'Teclado Organo Electronico Musical Instrumento 54 Teclas ', 'GADNIC', 'T01', 2250, 5, b'0'),
('9', '15', '300', 'Estas viendo un excelente y completísimo set de percusion para niños con estuche rígido, equipado con los instrumentos mas divertidos! De gran calidad y sonoridad. Ideal para jardines, escuelas primarias, musicoterapeutas o chicos que se quieran iniciar en la música de la mejor manera. Es un muy buen producto que garantiza entretenimiento en cualquier casa o reunión, ya que esta equipado para que varias personas al mismo tiempo estén tocando un instrumento.', 'nro1.jpg', 'Instrumentos De Percusión Niños Set Musical Con Estuche ', 'KNIGHT', 'LB17', 2700, 3, b'0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id` bigint(20) NOT NULL,
  `fecha_pedido` date DEFAULT NULL,
  `total_pedido` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id`, `fecha_pedido`, `total_pedido`) VALUES
(58, '2024-06-09', 2750),
(59, '2024-06-13', 17000),
(60, '2024-06-13', 4900),
(61, '2024-06-14', 3625),
(62, '2024-06-14', 2450),
(63, '2024-06-14', 2450);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_detalle`
--

CREATE TABLE `pedido_detalle` (
  `id` bigint(20) NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `instrumento_id` varchar(255) DEFAULT NULL,
  `pedido_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedido_detalle`
--

INSERT INTO `pedido_detalle` (`id`, `cantidad`, `instrumento_id`, `pedido_id`) VALUES
(24, 1, '7', 58),
(25, 1, '8', 58),
(26, 1, '6', 59),
(27, 1, '1', 61),
(28, 1, '10', 61),
(29, 1, '2', 61),
(30, 1, '1', 62),
(31, 1, '1', 63);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` bigint(20) NOT NULL,
  `clave` varchar(255) DEFAULT NULL,
  `nombre_usuario` varchar(255) DEFAULT NULL,
  `rol` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `clave`, `nombre_usuario`, `rol`) VALUES
(1, 'ef73781effc5774100f87fe2f437a435', 'admin', 'Admin'),
(2, 'e10adc3949ba59abbe56e057f20f883e', 'operador', 'Operador'),
(3, '81dc9bdb52d04dc20036dbd8313ed055', 'visor', 'Visor'),
(4, 'e10adc3949ba59abbe56e057f20f883e', 'Visor2', 'Visor');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria_instrumento`
--
ALTER TABLE `categoria_instrumento`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `instrumento`
--
ALTER TABLE `instrumento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKdctbc9jh7sunsljffsgsd6y58` (`categoria_id`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedido_detalle`
--
ALTER TABLE `pedido_detalle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKoa5c7ikdpmiwn2aalf6aqskwi` (`instrumento_id`),
  ADD KEY `FKhuvcqbd92kc4eqypgqmyi17cb` (`pedido_id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de la tabla `pedido_detalle`
--
ALTER TABLE `pedido_detalle`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `instrumento`
--
ALTER TABLE `instrumento`
  ADD CONSTRAINT `FKdctbc9jh7sunsljffsgsd6y58` FOREIGN KEY (`categoria_id`) REFERENCES `categoria_instrumento` (`id`);

--
-- Filtros para la tabla `pedido_detalle`
--
ALTER TABLE `pedido_detalle`
  ADD CONSTRAINT `FKhuvcqbd92kc4eqypgqmyi17cb` FOREIGN KEY (`pedido_id`) REFERENCES `pedido` (`id`),
  ADD CONSTRAINT `FKoa5c7ikdpmiwn2aalf6aqskwi` FOREIGN KEY (`instrumento_id`) REFERENCES `instrumento` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
