CREATE TABLE `tbl_persona` (
  `perid` int NOT NULL AUTO_INCREMENT,
  `pernom` varchar(50) DEFAULT NULL,
  `percel` varchar(10) DEFAULT NULL,
  `pervalpagar` decimal(10,0) DEFAULT NULL,
  `pervalpagado` decimal(10,0) DEFAULT NULL,
  `perbus` enum('1','0') DEFAULT '0',
  `perestado` enum('T','F','N') DEFAULT NULL COMMENT '(T)otal -> Pago ya todo, (F)alta -> Falta pagar una parte del dinero, (N)ada -> No ha pagado nada',
  PRIMARY KEY (`perid`)
);

CREATE PROCEDURE `sp_getAllInfo`()
BEGIN

SET @total_personas = (SELECT COUNT(*) FROM tbl_persona);
SET @personas_paz_y_salvo = (SELECT COUNT(*) FROM tbl_persona WHERE perestado = 'T');
SET @personas_sin_pagar = (SELECT COUNT(*) FROM tbl_persona WHERE pervalpagado = 0);
SET @total_a_recaudar = (SELECT SUM(pervalpagar) FROM tbl_persona);
SET @total_recaudado = (SELECT SUM(pervalpagado) FROM tbl_persona);

	SELECT
		@total_personas AS total_personas,
        @personas_paz_y_salvo AS personas_paz_y_salvo,
        @personas_sin_pagar AS personas_sin_pagar,
        @total_a_recaudar AS total_recaudar,
        @total_recaudado AS total_recaudado,
		perid,
        pernom,
        percel,
        pervalpagar,
        pervalpagado,
        (pervalpagar - pervalpagado) AS pervalres,
        IF(perestado = 'T', 'A paz y salvo', IF(perestado = 'F', 'Falta entregar dinero', 'No ha pagado nada')) AS perestado_text,
        perestado AS perestado
	FROM tbl_persona;

END

CREATE PROCEDURE `sp_savePerson`(
IN ipernom varchar(50),
IN ipercel varchar(10),
IN ipervalpagar decimal(10,0),
IN ipervalpagado decimal(10,0),
IN iperbus ENUM('1', '0'),
IN iperestado enum('T','F','N') 
)
BEGIN

INSERT INTO tbl_persona(pernom, percel, pervalpagar, pervalpagado, perbus, perestado)
VALUES (ipernom, ipercel, ipervalpagar, ipervalpagado, iperbus, iperestado);

SET @lastId = (SELECT LAST_INSERT_ID());

SELECT
	perid,
	pernom,
	percel,
	pervalpagar,
	pervalpagado,
    perbus,
	(pervalpagar - pervalpagado) AS pervalres,
	IF(perestado = 'T', 'A paz y salvo', IF(perestado = 'F', 'Falta entregar dinero', 'No ha pagado nada')) AS perestado
FROM tbl_persona
WHERE perid = @lastId;


END
