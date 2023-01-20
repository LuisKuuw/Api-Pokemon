create database pokedex_users;
use pokedex_users;

create table users(
id int(11) not null auto_increment primary key,
name varchar(200) not null
)engine= InnoDB charset=utf8mb4;

create table pokemon(
id int(11) not null auto_increment primary key,
number_pokedex int not null,
user_id int not null
)engine= InnoDB charset=utf8mb4;