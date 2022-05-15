SELECT idClients, 
       SUM(x*x+y*y+z*z) AS result
FROM game.clients
GROUP BY idClients
ORDER BY result DESC;
SELECT * FROM game.clients;


/*create table with columns*/
CREATE TABLE `game`.`clients` (
  `idclients` VARCHAR(45) NULL,
  `x` VARCHAR(45) NULL,
  `y` VARCHAR(45) NULL,
  `z` VARCHAR(45) NULL);
/* remove table */
use game ;
DROP TABLE IF EXISTS clients;

/*Insert new values to columns*/
INSERT INTO `game`.`clients`
(`idclients`,
`x`,
`y`,
`z`)
VALUES
("ali",1,12,1);


