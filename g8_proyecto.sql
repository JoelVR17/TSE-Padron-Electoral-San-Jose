/*  Grupo#8   Proyecto Final    SC-504   */

/*  SE CREA TABLA DEL PADRON  */

CREATE TABLE PADRON (

    CEDULA varchar2(9),
    CODELEC varchar2(6),
    FECHACADUC varchar2(8),
    NOMBRE varchar2(30),
    APELLIDO1 varchar2(30),
    APELLIDO2 varchar2(30)

);
CREATE TABLE DISTELEC (

    CODELEC number(6),
    PROVINCIA varchar2(10),
    CANTON varchar2(30),
    DISTRITO varchar2(34)

);
CREATE TABLE BITACORA (

    ID number PRIMARY KEY ,   
    CEDULA number(9),
    FECHA date

);

/*  SE CREA TABLA DE ROL  */
CREATE TABLE ROL (

    IDROL number PRIMARY KEY,   
    NOMBRE varchar2(10)

);

/*  SE CREA TABLA DE USUARIO  */
CREATE TABLE USUARIO (

    IDUSUARIO number primary key,   
    USUARIO varchar2(20),
    CONTRASENA varchar2(20),
    IDROL number(11),
    FOREIGN KEY(IDROL) REFERENCES ROL(IDROL)

);

/*SE HACEN LAS INSERCIONES DE LOS DOS ROLES*/
INSERT INTO rol 
VALUES 
(1, 'Admin');

INSERT INTO rol 
VALUES 
(2, 'Usuario');














