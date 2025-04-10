# Trabalho_react1
# Sistema de Gerenciamento de Usuários

Este projeto é uma aplicação fullstack composta por um **frontend em React** e um **backend em Node.js (Express)**, voltada para o gerenciamento de usuários, com funcionalidades de listagem, visualização de detalhes, edição e remoção de registros.

para iniciar, primeiro va até 

backend/db.js e mude suas credênciais. 

depois volte para a pasta backend e digite os seguintes comando: 

npm install 

cd ../ 

cd frontend 

cd react_banco

npm install

npm start

cd ../ 

cd ../

cd backend

npm start


entre em um navegador de sua preferencia e pesquise por: 

http://localhost:3000/


obs* é necessario tambem criar um banco de dados sql, abaixo consta o codigo para mysql
-------------------------------------------------------------------------------------------

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(145) DEFAULT NULL,
  `sobrenome` varchar(145) DEFAULT NULL,
  `cpf` varchar(145) DEFAULT NULL,
  `pais` varchar(145) DEFAULT NULL,
  `cidade` varchar(145) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_cpf` (`cpf`)
) 

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;

INSERT INTO `usuarios` VALUES (520,'BRUNO','ALVES','80565921991','Brasil','Cajuru'),(521,'BRUNO','ALVES','078.466.219-39','Brasil','Cajuru'),(522,'João','Silva','52998224725','Brasil','São Paulo'),(523,'Maria','Santos','45358924704','Argentina','Rio de Janeiro'),(524,'Pedro','Oliveira','72026824701','Portugal','Belo Horizonte'),(525,'Ana','Souza','36612624707','Estados Unidos','Porto Alegre'),(526,'Carlos','Pereira','94458824706','Espanha','Curitiba'),(527,'Lucia','Costa','26695524705','Brasil','Salvador'),(528,'Paulo','Ferreira','50347724702','Argentina','Recife'),(529,'Juliana','Rodrigues','87732424703','Portugal','Fortaleza'),(530,'Marcos','Almeida','13486624700','Estados Unidos','Brasília'),(531,'Fernanda','Lima','69821124708','Espanha','Manaus'),(532,'Ricardo','Mendes','32579924709','Brasil','São Paulo'),(533,'Camila','Gomes','84163324710','Argentina','Rio de Janeiro'),(534,'Lucas','Martins','46214424711','Portugal','Belo Horizonte'),(535,'Patricia','Rocha','18957724712','Estados Unidos','Porto Alegre'),(536,'Eduardo','Ribeiro','73382224713','Espanha','Curitiba'),(537,'Amanda','Carvalho','25790024714','Brasil','Salvador'),(538,'Rodrigo','Teixeira','91445524715','Argentina','Recife'),(539,'Tatiane','Nascimento','64893324716','Portugal','Fortaleza'),(540,'Gustavo','Lopes','37128824717','Estados Unidos','Brasília'),(541,'Isabela','Cunha','58271124718','Espanha','Manaus'),(542,'Fernando','Pires','12564424719','Brasil','São Paulo'),(543,'Beatriz','Xavier','83997724720','Argentina','Rio de Janeiro'),(544,'Roberto','Ramalho','46782224721','Portugal','Belo Horizonte'),(545,'Vanessa','Dias','29315524722','Estados Unidos','Porto Alegre'),(546,'Diego','Monteiro','75648824723','Espanha','Curitiba'),(547,'Mariana','Reis','38491124724','Brasil','Salvador'),(548,'Antonio','Siqueira','61237724725','Argentina','Recife'),(549,'Cristina','Vasconcelos','94582224726','Portugal','Fortaleza'),(550,'Rafael','Barros','27865524727','Estados Unidos','Brasília'),(551,'Daniela','Fonseca','86119924728','Espanha','Manaus');








