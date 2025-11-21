CREATE DATABASE DicriDB;
GO
USE DicriDB;
GO

CREATE TABLE Roles (
    rol_id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Usuarios (
    usuario_id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol_id INT NOT NULL,
    activo BIT NOT NULL DEFAULT 1,
    FOREIGN KEY (rol_id) REFERENCES Roles(rol_id)
);

CREATE TABLE EstadosExpediente (
    estado_id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Expedientes (
    expediente_id INT IDENTITY(1,1) PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(500) NULL,
    fecha_registro DATETIME NOT NULL DEFAULT GETDATE(),
    tecnico_id INT NOT NULL,
    coordinador_id INT NULL,
    estado_id INT NOT NULL,
    fecha_cierre DATETIME NULL,
    FOREIGN KEY (tecnico_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (coordinador_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (estado_id) REFERENCES EstadosExpediente(estado_id)
);

CREATE TABLE Indicios (
    indicio_id INT IDENTITY(1,1) PRIMARY KEY,
    expediente_id INT NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    color VARCHAR(50) NULL,
    tamano VARCHAR(50) NULL,
    peso DECIMAL(10,2) NULL,
    ubicacion VARCHAR(200) NULL,
    tecnico_id INT NOT NULL,
    fecha_registro DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (expediente_id) REFERENCES Expedientes(expediente_id),
    FOREIGN KEY (tecnico_id) REFERENCES Usuarios(usuario_id)
);

CREATE TABLE HistorialEstados (
    historial_id INT IDENTITY(1,1) PRIMARY KEY,
    expediente_id INT NOT NULL,
    estado_id INT NOT NULL,
    fecha DATETIME NOT NULL DEFAULT GETDATE(),
    usuario_id INT NOT NULL,
    justificacion VARCHAR(500) NULL,
    FOREIGN KEY (expediente_id) REFERENCES Expedientes(expediente_id),
    FOREIGN KEY (estado_id) REFERENCES EstadosExpediente(estado_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

INSERT INTO Roles (nombre) VALUES ('Tecnico'), ('Coordinador'), ('Administrador');

INSERT INTO EstadosExpediente (nombre)
VALUES ('Registrado'), ('En revisión'), ('Rechazado'), ('Aprobado');

INSERT INTO Usuarios (nombre, email, password_hash, rol_id, activo)
VALUES ('Tecnico Demo', 'tecnico@dicri.local', '123456', 1, 1),
       ('Coordinador Demo', 'coordinador@dicri.local', '123456', 2, 1),
       ('Admin Demo', 'admin@dicri.local', '123456', 3, 1);
