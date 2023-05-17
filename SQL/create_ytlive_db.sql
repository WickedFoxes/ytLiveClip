-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               10.11.2-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for ytlive
DROP DATABASE IF EXISTS `ytlive`;
CREATE DATABASE IF NOT EXISTS `ytlive` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `ytlive`;

-- Dumping structure for table ytlive.channels
DROP TABLE IF EXISTS `channels`;
CREATE TABLE IF NOT EXISTS `channels` (
  `channel_name` varchar(500) NOT NULL,
  `channel_img` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`channel_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table ytlive.liveon
DROP TABLE IF EXISTS `liveon`;
CREATE TABLE IF NOT EXISTS `liveon` (
  `videoid` varchar(500) NOT NULL,
  `liveon` int(11) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `video_name` varchar(500) DEFAULT NULL,
  `video_img` varchar(500) DEFAULT NULL,
  `channel_name` varchar(500) NOT NULL,
  PRIMARY KEY (`videoid`),
  KEY `channel_name` (`channel_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table ytlive.viewerscount
DROP TABLE IF EXISTS `viewerscount`;
CREATE TABLE IF NOT EXISTS `viewerscount` (
  `videoid` varchar(500) NOT NULL,
  `viewers` int(11) DEFAULT NULL,
  `time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
