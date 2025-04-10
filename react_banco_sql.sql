-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: crud
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(145) DEFAULT NULL,
  `sobrenome` varchar(145) DEFAULT NULL,
  `cpf` varchar(145) DEFAULT NULL,
  `pais` varchar(145) DEFAULT NULL,
  `cidade` varchar(145) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_cpf` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=554 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (521,'BRUNO','ALVES','078.466.219-39','Brasil','Cajuru'),(522,'João','Silva','52998224725','Brasil','São Paulo'),(523,'Maria','Santos','20024029068','Argentina','Rio de Janeiro'),(524,'Pedro','Oliveira','72026824701','Portugal','Belo Horizonte'),(525,'Ana','Souza','36612624707','Estados Unidos','Porto Alegre'),(526,'Carlos','Pereira','94458824706','Espanha','Curitiba'),(527,'Lucia','Costa','26695524705','Brasil','Salvador'),(528,'Paulo','Ferreira','50347724702','Argentina','Recife'),(529,'Juliana','Rodrigues','87732424703','Portugal','Fortaleza'),(530,'Marcos','Almeida','13486624700','Estados Unidos','Brasília'),(531,'Fernanda','Lima','69821124708','Espanha','Manaus'),(532,'Ricardo','Mendes','32579924709','Brasil','São Paulo'),(533,'Camila','Gomes','84163324710','Argentina','Rio de Janeiro'),(534,'Lucas','Martins','46214424711','Portugal','Belo Horizonte'),(535,'Patricia','Rocha','18957724712','Estados Unidos','Porto Alegre'),(536,'Eduardo','Ribeiro','73382224713','Espanha','Curitiba'),(537,'Amanda','Carvalho','25790024714','Brasil','Salvador'),(538,'Rodrigo','Teixeira','91445524715','Argentina','Recife'),(539,'Tatiane','Nascimento','64893324716','Portugal','Fortaleza'),(540,'Gustavo','Lopes','37128824717','Estados Unidos','Brasília'),(541,'Isabela','Cunha','58271124718','Espanha','Manaus'),(542,'Fernando','Pires','12564424719','Brasil','São Paulo'),(543,'Beatriz','Xavier','83997724720','Argentina','Rio de Janeiro'),(544,'Roberto','Ramalho','46782224721','Portugal','Belo Horizonte'),(545,'Vanessa','Dias','29315524722','Estados Unidos','Porto Alegre'),(546,'Diego','Monteiro','75648824723','Espanha','Curitiba'),(547,'Mariana','Reis','38491124724','Brasil','Salvador'),(548,'Antonio','Siqueira','61237724725','Argentina','Recife'),(549,'Cristina','Vasconcelos','94582224726','Portugal','Fortaleza'),(550,'Rafael','Barros','27865524727','Estados Unidos','Brasília'),(551,'Daniela','Fonseca','86119924728','Espanha','Manaus'),(553,'pedro pedro','ALVES','05857299055','Brasil','Cajuru');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-10 11:41:31
