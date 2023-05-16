CREATE DATABASE IF NOT EXISTS karmadb;

USE karmadb;

CREATE TABLE usuarios (
    id INT NOT NULL AUTO_INCREMENT,
    username varchar(30) NOT NULL,
    password varchar(40) NOT NULL,
    perfil varchar(5) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    nombre varchar(40) NOT NULL,
    apellidos varchar(100),
    telefono int,
    activo varchar(1) DEFAULT 'S',
    fecha_baja timestamp,
    codigo_cliente varchar(15),
    PRIMARY KEY (id, username)
);