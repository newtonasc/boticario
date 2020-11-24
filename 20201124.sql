-- --------------------------------------------------------
-- Servidor:                     3.129.78.148
-- Versão do servidor:           5.7.31 - MySQL Community Server (GPL)
-- OS do Servidor:               Linux
-- HeidiSQL Versão:              11.1.0.6116
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para 20201124
CREATE DATABASE IF NOT EXISTS `20201124` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `20201124`;

-- Copiando estrutura para tabela 20201124.purshases
CREATE TABLE IF NOT EXISTS `purshases` (
  `pur_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pur_cpf` varchar(14) NOT NULL DEFAULT '',
  `pur_code` varchar(50) NOT NULL DEFAULT '',
  `pur_value` decimal(10,2) unsigned NOT NULL DEFAULT '0.00',
  `pur_sta_id` int(10) unsigned NOT NULL,
  `pur_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pur_id`),
  UNIQUE KEY `pur_code` (`pur_code`),
  KEY `FK_purshases_resellers_2` (`pur_cpf`),
  KEY `FK_purshases_status` (`pur_sta_id`),
  CONSTRAINT `FK_purshases_resellers_2` FOREIGN KEY (`pur_cpf`) REFERENCES `resellers` (`res_cpf`),
  CONSTRAINT `FK_purshases_status` FOREIGN KEY (`pur_sta_id`) REFERENCES `status` (`sta_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela 20201124.purshases: ~7 rows (aproximadamente)
/*!40000 ALTER TABLE `purshases` DISABLE KEYS */;
INSERT INTO `purshases` (`pur_id`, `pur_cpf`, `pur_code`, `pur_value`, `pur_sta_id`, `pur_date`) VALUES
	(1, '39254433599', '01247891', 2100.90, 1, '2020-11-24 13:41:42'),
	(2, '39254433599', '01245891', 1000.59, 1, '2020-11-24 13:42:10'),
	(3, '39254433599', '01347891', 980.99, 1, '2020-11-24 13:42:23'),
	(4, '39254433599', '01247861', 1290.99, 1, '2020-11-24 13:42:35'),
	(6, '15350946056', '01247691', 1870.00, 2, '2020-11-24 13:44:08'),
	(7, '15350946056', '01247991', 959.00, 2, '2020-11-24 13:46:58'),
	(8, '23482254532', '01249791', 500.00, 1, '2020-11-24 13:48:27');
/*!40000 ALTER TABLE `purshases` ENABLE KEYS */;

-- Copiando estrutura para tabela 20201124.resellers
CREATE TABLE IF NOT EXISTS `resellers` (
  `res_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `res_name` varchar(150) NOT NULL,
  `res_email` varchar(250) NOT NULL,
  `res_cpf` varchar(14) NOT NULL,
  `res_passwd` varchar(32) NOT NULL,
  `res_address` varchar(250) DEFAULT NULL,
  `res_cep` varchar(9) DEFAULT NULL,
  `res_uf` char(2) DEFAULT NULL,
  `res_phone` varchar(15) DEFAULT NULL,
  `res_birth` date DEFAULT '1970-01-01',
  `res_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`res_id`),
  UNIQUE KEY `cpf` (`res_cpf`) USING BTREE,
  UNIQUE KEY `email` (`res_email`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela 20201124.resellers: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `resellers` DISABLE KEYS */;
INSERT INTO `resellers` (`res_id`, `res_name`, `res_email`, `res_cpf`, `res_passwd`, `res_address`, `res_cep`, `res_uf`, `res_phone`, `res_birth`, `res_date`) VALUES
	(1, 'José Maria', 'jm@teste.com.br', '23482254532', '662eaa47199461d01a623884080934ab', 'rua XV, 300, centro - Curitiba', '82000000', 'PR', '41992324425', '1976-07-08', '2020-11-24 13:00:31'),
	(3, 'Fernando Kwait', 'fk@teste.com.br', '19258433322', 'cebdd715d4ecaafee8f147c2e85e0754', NULL, NULL, NULL, NULL, NULL, '2020-11-24 13:06:25'),
	(4, 'Maria José', 'mj@teste.com.br', '39254433599', '263bce650e68ab4e23f28263760b9fa5', NULL, NULL, NULL, NULL, NULL, '2020-11-24 13:07:31'),
	(5, 'Pedro Simão', 'ps@teste.com.br', '09113663570', '263bce650e68ab4e23f28263760b9fa5', NULL, NULL, NULL, NULL, NULL, '2020-11-24 13:11:26'),
	(6, 'Teste User', 'tu@teste.com.br', '15350946056', '698dc19d489c4e4db73e28a713eab07b', NULL, NULL, NULL, NULL, NULL, '2020-11-24 13:44:00');
/*!40000 ALTER TABLE `resellers` ENABLE KEYS */;

-- Copiando estrutura para tabela 20201124.status
CREATE TABLE IF NOT EXISTS `status` (
  `sta_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sta_status` char(15) NOT NULL,
  PRIMARY KEY (`sta_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela 20201124.status: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` (`sta_id`, `sta_status`) VALUES
	(1, 'Em validação'),
	(2, 'Aprovado'),
	(3, 'Reprovado');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
