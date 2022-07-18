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

/*  SE CREA TABLA DE DISTELEC  */
CREATE TABLE DISTELEC (

    CODELEC number(6),
    PROVINCIA varchar2(10),
    CANTON varchar2(30),
    DISTRITO varchar2(34)

)

/*  SE CREA TABLA DE BITACORA  */
CREATE TABLE BITACORA (

    ID number(11) primary key,   
    CEDULA number(9),
    FECHA date

)

/*  SE CREA TABLA DE ROL  */
CREATE TABLE rol (

    ID number(11) primary key,   
    NOMBRE varchar2(10)

)

/*  SE CREA TABLA DE USUARIO  */
CREATE TABLE usuario (

    idUsuario number(11) primary key,   
    usuario varchar2(20),
    contrasena varchar2(20),
    idRol number(11),
    constraint fk_rol foreign key(idRol) references hr.rol(ID)

)

/*SE HACEN LAS INSERCIONES DE LOS DOS ROLES*/
INSERT INTO rol 
VALUES 
(1, 'Admin');

INSERT INTO rol 
VALUES 
(2, 'Usuario');














