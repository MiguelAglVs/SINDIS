DROP TABLE imagenes;
DROP TABLE permisos;
DROP TABLE personas;
DROP TABLE usuarios;
DROP TABLE formularios;

DROP TABLE diagnosticos;
DROP TABLE discapacidades;
DROP TABLE eps;
DROP TABLE estados;
DROP TABLE perfiles;
DROP TABLE roles;


-- Tabla usuarios --
CREATE TABLE usuarios (
    dni             VARCHAR2(35),
    nombre          VARCHAR2(20),
    p_apellido      VARCHAR2(20),
    s_apellido      VARCHAR2(20),
    correo          VARCHAR2(100),
    contrasenia     VARCHAR2(255),
    direccion       VARCHAR2(100),
    telefono        NUMBER(15),
    estado          NUMBER(2),
    perfil          NUMBER(2)
)
TABLESPACE ts_usuarios;

ALTER TABLE usuarios ADD CONSTRAINT pk_usuarios PRIMARY KEY ( dni );

ALTER TABLE usuarios ADD CONSTRAINT nn_dni_usuarios             CHECK ( dni IS NOT NULL );
ALTER TABLE usuarios ADD CONSTRAINT nn_nombre_usuarios          CHECK ( nombre IS NOT NULL );
ALTER TABLE usuarios ADD CONSTRAINT nn_p_apellido_usuarios      CHECK ( p_apellido IS NOT NULL );
ALTER TABLE usuarios ADD CONSTRAINT nn_correo_usuarios          CHECK ( correo IS NOT NULL );
ALTER TABLE usuarios ADD CONSTRAINT nn_contrasenia_usuarios     CHECK ( contrasenia IS NOT NULL );
ALTER TABLE usuarios ADD CONSTRAINT nn_direccion_usuarios       CHECK ( direccion IS NOT NULL );
ALTER TABLE usuarios ADD CONSTRAINT nn_telefono_usuarios        CHECK ( telefono IS NOT NULL );
ALTER TABLE usuarios ADD CONSTRAINT nn_perfil_usuarios          CHECK ( perfil IS NOT NULL );
-- fin Tabla usuarios --

--Tabla estados--
CREATE TABLE estados (
    id     NUMBER(2),
    nombre VARCHAR2(20)
)
TABLESPACE ts_usuarios;

ALTER TABLE estados ADD CONSTRAINT pk_estados PRIMARY KEY ( id );

ALTER TABLE estados ADD CONSTRAINT nn_id_estados            CHECK ( id IS NOT NULL );
ALTER TABLE estados ADD CONSTRAINT nn_nombre_estados        CHECK ( nombre IS NOT NULL );
-- fin tabla estados --

--Tabla imagenes--
CREATE TABLE imagenes (
    id              NUMBER(1),
    ruta            VARCHAR2(255),
    usuario         VARCHAR2(35)
)
TABLESPACE ts_usuarios;

ALTER TABLE imagenes ADD CONSTRAINT pk_imagenes PRIMARY KEY ( id );

ALTER TABLE imagenes ADD CONSTRAINT nn_id_imagenes              CHECK ( id IS NOT NULL );
ALTER TABLE imagenes ADD CONSTRAINT nn_ruta_imagenes            CHECK ( ruta IS NOT NULL );
ALTER TABLE imagenes ADD CONSTRAINT nn_usuario_imagenes         CHECK ( usuario IS NOT NULL );
-- fin tabla imagenes --

-- Tabla roles --
CREATE TABLE roles (
    id          NUMBER(2),
    nombre      VARCHAR2(20)
)
TABLESPACE ts_usuarios;

ALTER TABLE roles ADD CONSTRAINT pk_rol PRIMARY KEY ( id );

ALTER TABLE roles ADD CONSTRAINT nn_id_roles            CHECK ( id IS NOT NULL );
ALTER TABLE roles ADD CONSTRAINT nn_nombre_roles        CHECK ( nombre IS NOT NULL );
-- fin tabla roles --

-- Tabla formularios --
CREATE TABLE formularios (
    id          NUMBER(2),
    nombre      VARCHAR2(20),
    ruta        VARCHAR2(255)
)
TABLESPACE ts_usuarios;

ALTER TABLE formularios ADD CONSTRAINT pk_formularios PRIMARY KEY ( id );

ALTER TABLE formularios ADD CONSTRAINT nn_id_formularios        CHECK ( id IS NOT NULL );
ALTER TABLE formularios ADD CONSTRAINT nn_nombre_formularios    CHECK ( nombre IS NOT NULL );
ALTER TABLE formularios ADD CONSTRAINT nn_ruta_formularios      CHECK ( ruta IS NOT NULL );
-- fin tabla formularios --

-- Tabla operaciones
CREATE TABLE perfiles (
    id          NUMBER(2),
    rol         NUMBER(2),
    nombre      VARCHAR2(15)
)
TABLESPACE ts_usuarios;

ALTER TABLE perfiles ADD CONSTRAINT pk_perfiles PRIMARY KEY ( id );

ALTER TABLE perfiles ADD CONSTRAINT nn_id_perfiles          CHECK ( id IS NOT NULL );
ALTER TABLE perfiles ADD CONSTRAINT nn_rol_perfiles         CHECK ( rol IS NOT NULL );
ALTER TABLE perfiles ADD CONSTRAINT nn_nombre_perfiles      CHECK ( nombre IS NOT NULL );
--fin tabla perfiles--

-- tabla permisos --
CREATE TABLE permisos (
    formulario      NUMBER(2),
    perfil          NUMBER(2),
    crear           VARCHAR2(1),
    leer            VARCHAR2(1),
    actualizar      VARCHAR2(1),
    eliminar        VARCHAR2(1)
)
TABLESPACE ts_usuarios;

ALTER TABLE permisos ADD CONSTRAINT pk_permisos PRIMARY KEY ( formulario, perfil );

ALTER TABLE permisos ADD CONSTRAINT nn_formulario_permisos      CHECK ( formulario IS NOT NULL );
ALTER TABLE permisos ADD CONSTRAINT nn_perfil_permisos          CHECK ( perfil IS NOT NULL );
ALTER TABLE permisos ADD CONSTRAINT nn_crear_permisos           CHECK ( crear IS NOT NULL );
ALTER TABLE permisos ADD CONSTRAINT nn_leer_permisos            CHECK ( leer IS NOT NULL );
ALTER TABLE permisos ADD CONSTRAINT nn_actualizar_permisos      CHECK ( actualizar IS NOT NULL );
ALTER TABLE permisos ADD CONSTRAINT nn_eliminar_permisos        CHECK ( eliminar IS NOT NULL );
-- fin tabla permisos --

-- tabla personas --
CREATE TABLE personas (
    dni             VARCHAR2 (35),
    nombre          VARCHAR2 (20),
    p_apellido      VARCHAR2 (20),
    s_apellido      VARCHAR2 (20),
    nacimiento      DATE,
    discapacidad    NUMBER (2),
    diagnostico     NUMBER (2),
    eps             NUMBER (2),
    estado          NUMBER(12),
    usuario         VARCHAR2(35)
) TABLESPACE
ts_usuarios;

ALTER TABLE personas ADD CONSTRAINT pk_personas PRIMARY KEY ( dni );

ALTER TABLE personas ADD CONSTRAINT nn_dni_personas             CHECK ( dni IS NOT NULL );
ALTER TABLE personas ADD CONSTRAINT nn_nombre_personas          CHECK ( nombre IS NOT NULL );
ALTER TABLE personas ADD CONSTRAINT nn_p_apellido_personas      CHECK ( p_apellido IS NOT NULL );
ALTER TABLE personas ADD CONSTRAINT nn_s_apellido_personas      CHECK ( s_apellido IS NOT NULL );
ALTER TABLE personas ADD CONSTRAINT nn_nacimiento_personas      CHECK ( nacimiento IS NOT NULL );
ALTER TABLE personas ADD CONSTRAINT nn_discapacidad_personas    CHECK ( discapacidad IS NOT NULL );
ALTER TABLE personas ADD CONSTRAINT nn_diagnostico_personas     CHECK ( diagnostico IS NOT NULL );
ALTER TABLE personas ADD CONSTRAINT nn_eps_personas             CHECK ( eps IS NOT NULL );
ALTER TABLE personas ADD CONSTRAINT nn_estado_personas          CHECK ( estado IS NOT NULL );
ALTER TABLE personas ADD CONSTRAINT nn_usuario_personas         CHECK ( usuario IS NOT NULL );
-- fin tabla personas --

-- tabla eps --
CREATE TABLE eps (
    id          NUMBER(2),
    nombre      VARCHAR2(20)
)
TABLESPACE ts_usuarios;

ALTER TABLE eps ADD CONSTRAINT pk_eps PRIMARY KEY ( id );

ALTER TABLE eps ADD CONSTRAINT nn_id_eps            CHECK ( id IS NOT NULL );
ALTER TABLE eps ADD CONSTRAINT nn_nombre_eps        CHECK ( nombre IS NOT NULL );
-- fin tabla eps --

-- tabla discapacidades --
CREATE TABLE discapacidades (
    id          NUMBER(2),
    nombre      VARCHAR2(20)
)
TABLESPACE ts_usuarios;

ALTER TABLE discapacidades ADD CONSTRAINT pk_discapacidad PRIMARY KEY ( id );

ALTER TABLE discapacidades ADD CONSTRAINT nn_id_discapacidades          CHECK ( id IS NOT NULL );
ALTER TABLE discapacidades ADD CONSTRAINT nn_nombre_discapacidades      CHECK ( nombre IS NOT NULL );
-- fin tabla discapacidades --

-- tabla diagnosticos --
CREATE TABLE diagnosticos (
    id          NUMBER(2),
    nombre      VARCHAR2(20)
)
TABLESPACE ts_usuarios;

ALTER TABLE diagnosticos ADD CONSTRAINT pk_diagnostico PRIMARY KEY ( id );

ALTER TABLE diagnosticos ADD CONSTRAINT nn_id_diagnostico           CHECK ( id IS NOT NULL );
ALTER TABLE diagnosticos ADD CONSTRAINT nn_nombre_diagnostico       CHECK ( nombre IS NOT NULL );
-- fin tabla diagnosticos --



-- clave foraneas --
ALTER TABLE imagenes
    ADD CONSTRAINT fk_imagenes_usuarios FOREIGN KEY ( usuario )
        REFERENCES usuarios ( dni );

ALTER TABLE personas
    ADD CONSTRAINT fk_personas_diagnostico FOREIGN KEY ( diagnostico )
        REFERENCES diagnosticos ( id );

ALTER TABLE personas
    ADD CONSTRAINT fk_personas_discapacidad FOREIGN KEY ( discapacidad )
        REFERENCES discapacidades ( id );

ALTER TABLE personas
    ADD CONSTRAINT fk_personas_eps FOREIGN KEY ( eps )
        REFERENCES eps ( id );

ALTER TABLE personas
    ADD CONSTRAINT fk_personas_usuarios FOREIGN KEY ( usuario )
        REFERENCES usuarios ( dni );

ALTER TABLE usuarios
    ADD CONSTRAINT fk_usuarios_estados FOREIGN KEY ( estado )
        REFERENCES estados ( id );

ALTER TABLE personas
    ADD CONSTRAINT fk_personas_estados FOREIGN KEY ( estado )
        REFERENCES estados ( id );

ALTER TABLE perfiles
    ADD CONSTRAINT fk_perfiles_roles FOREIGN KEY ( rol )
        REFERENCES roles ( id );

ALTER TABLE permisos
    ADD CONSTRAINT fk_permisos_formularios FOREIGN KEY ( formulario )
        REFERENCES formularios ( id );

ALTER TABLE permisos
    ADD CONSTRAINT fk_permisos_perfiles FOREIGN KEY ( perfil )
        REFERENCES perfiles ( id );

ALTER TABLE usuarios
    ADD CONSTRAINT fk_usuarios_perfiles FOREIGN KEY ( perfil )
        REFERENCES perfiles ( id );
-- fin clave foraneas --



-- Secuencia para la tabla imagenes --
DROP SEQUENCE seq_imagenes;
CREATE SEQUENCE seq_imagenes START WITH 1 INCREMENT BY 1 NOMAXVALUE CACHE 10;

ALTER TABLE imagenes MODIFY (
    id DEFAULT seq_imagenes.NEXTVAL
);

-- Secuencia para la tabla estados
DROP SEQUENCE seq_estados;
CREATE SEQUENCE seq_estados START WITH 1 INCREMENT BY 1 NOMAXVALUE CACHE 10;

ALTER TABLE estados MODIFY (
    id DEFAULT seq_estados.NEXTVAL
);

-- Secuencia para la tabla roles
DROP SEQUENCE seq_roles;
CREATE SEQUENCE seq_roles START WITH 1 INCREMENT BY 1 NOMAXVALUE CACHE 10;

ALTER TABLE roles MODIFY (
    id DEFAULT seq_roles.NEXTVAL
);

-- Secuencia para la tabla perfiles
DROP SEQUENCE seq_perfiles;
CREATE SEQUENCE seq_perfiles START WITH 1 INCREMENT BY 1 NOMAXVALUE CACHE 10;

ALTER TABLE perfiles MODIFY (
    id DEFAULT seq_perfiles.NEXTVAL
);

-- Secuencia para la tabla formularios
DROP SEQUENCE seq_formularios;
CREATE SEQUENCE seq_formularios START WITH 1 INCREMENT BY 1 NOMAXVALUE CACHE 10;

ALTER TABLE formularios MODIFY (
    id DEFAULT seq_formularios.NEXTVAL
);

-- Secuencia para la tabla eps
DROP SEQUENCE seq_eps;
CREATE SEQUENCE seq_eps START WITH 1 INCREMENT BY 1 NOMAXVALUE CACHE 10;

ALTER TABLE eps MODIFY (
    id DEFAULT seq_eps.NEXTVAL
);

-- Secuencia para la tabla diagnosticos
DROP SEQUENCE seq_diagnosticos;
CREATE SEQUENCE seq_diagnosticos START WITH 1 INCREMENT BY 1 NOMAXVALUE CACHE 10;

ALTER TABLE diagnosticos MODIFY (
    id DEFAULT seq_diagnosticos.NEXTVAL
);

-- Secuencia para la tabla discapacidades
DROP SEQUENCE seq_discapacidades;
CREATE SEQUENCE seq_discapacidades START WITH 1 INCREMENT BY 1 NOMAXVALUE CACHE 10;

ALTER TABLE discapacidades MODIFY (
    id DEFAULT seq_discapacidades.NEXTVAL
);


select * from estados;
insert into estados (id,nombre)
values (seq_estados.NEXTVAL,:nombre);

select * from roles;
insert into roles (id,nombre)
values (seq_roles.NEXTVAL,:nombre);

select * from perfiles;
insert into perfiles (id, rol,nombre)
values (seq_perfiles.NEXTVAL, :rol,:nombre);

select * from usuarios;
INSERT INTO usuarios (dni, nombre, p_apellido, s_apellido, correo, contrasenia, direccion, telefono, estado, perfil)
VALUES (:cedula, :nombre, :apellido, :segundo_apellido, :correo, :contrasena, :direccion, :telefono, 1, :perfil)

DELETE FROM perfiles;


SELECT * FROM personas

UPDATE personas SET estado = 1 WHERE dni = :cedula AND estado != 1

SELECT COUNT(*) as count, MAX(estado) as max_estado FROM personas WHERE dni = :cedula

commit
