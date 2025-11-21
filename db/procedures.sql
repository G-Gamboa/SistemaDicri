USE DicriDB;
GO

CREATE OR ALTER PROCEDURE spUsuarios_Login
  @email VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT u.usuario_id, u.nombre, u.email, u.password_hash, r.nombre AS rol
    FROM Usuarios u
    INNER JOIN Roles r ON u.rol_id = r.rol_id
    WHERE u.email = @email AND u.activo = 1;
END;
GO

CREATE OR ALTER PROCEDURE spExpedientes_Insert
  @codigo VARCHAR(50),
  @descripcion VARCHAR(500),
  @tecnico_id INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @estadoRegistrado INT;
    SELECT @estadoRegistrado = estado_id FROM EstadosExpediente WHERE nombre = 'Registrado';

    INSERT INTO Expedientes (codigo, descripcion, tecnico_id, estado_id)
    VALUES (@codigo, @descripcion, @tecnico_id, @estadoRegistrado);

    DECLARE @nuevoId INT = SCOPE_IDENTITY();

    INSERT INTO HistorialEstados (expediente_id, estado_id, usuario_id, justificacion)
    VALUES (@nuevoId, @estadoRegistrado, @tecnico_id, 'Creación de expediente');

    SELECT @nuevoId AS expediente_id;
END;
GO

CREATE OR ALTER PROCEDURE spExpedientes_Update
  @expediente_id INT,
  @descripcion VARCHAR(500)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Expedientes
    SET descripcion = @descripcion
    WHERE expediente_id = @expediente_id;
END;
GO

CREATE OR ALTER PROCEDURE spExpedientes_Delete
  @expediente_id INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM HistorialEstados WHERE expediente_id = @expediente_id;
    DELETE FROM Indicios WHERE expediente_id = @expediente_id;
    DELETE FROM Expedientes WHERE expediente_id = @expediente_id;
END;
GO

CREATE OR ALTER PROCEDURE spIndicios_Insert
  @expediente_id INT,
  @descripcion VARCHAR(500),
  @color VARCHAR(50),
  @tamano VARCHAR(50),
  @peso DECIMAL(10,2),
  @ubicacion VARCHAR(200),
  @tecnico_id INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Indicios (expediente_id, descripcion, color, tamano, peso, ubicacion, tecnico_id)
    VALUES (@expediente_id, @descripcion, @color, @tamano, @peso, @ubicacion, @tecnico_id);

    SELECT SCOPE_IDENTITY() AS indicio_id;
END;
GO

CREATE OR ALTER PROCEDURE spIndicios_ListByExpediente
  @expediente_id INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT i.indicio_id, i.descripcion, i.color, i.tamano, i.peso,
           i.ubicacion, i.fecha_registro, u.nombre AS tecnico
    FROM Indicios i
    INNER JOIN Usuarios u ON i.tecnico_id = u.usuario_id
    WHERE i.expediente_id = @expediente_id
    ORDER BY i.fecha_registro DESC;
END;
GO

CREATE OR ALTER PROCEDURE spExpedientes_CambiarEstado
  @expediente_id INT,
  @nuevo_estado VARCHAR(50),
  @usuario_id INT,
  @justificacion VARCHAR(500) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @estado_id INT;
    SELECT @estado_id = estado_id
    FROM EstadosExpediente
    WHERE nombre = @nuevo_estado;

    UPDATE Expedientes
    SET estado_id = @estado_id,
        fecha_cierre = CASE WHEN @nuevo_estado = 'Aprobado' THEN GETDATE() ELSE fecha_cierre END
    WHERE expediente_id = @expediente_id;

    INSERT INTO HistorialEstados (expediente_id, estado_id, usuario_id, justificacion)
    VALUES (@expediente_id, @estado_id, @usuario_id, @justificacion);
END;
GO

CREATE OR ALTER PROCEDURE spReportes_Expedientes
  @fechaInicio DATETIME = NULL,
  @fechaFin DATETIME = NULL,
  @estado VARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT e.expediente_id, e.codigo, e.descripcion, e.fecha_registro,
           tec.nombre AS tecnico, est.nombre AS estado
    FROM Expedientes e
    INNER JOIN Usuarios tec ON e.tecnico_id = tec.usuario_id
    INNER JOIN EstadosExpediente est ON e.estado_id = est.estado_id
    WHERE (@fechaInicio IS NULL OR e.fecha_registro >= @fechaInicio)
      AND (@fechaFin IS NULL OR e.fecha_registro <= @fechaFin)
      AND (@estado IS NULL OR est.nombre = @estado)
    ORDER BY e.fecha_registro DESC;
END;
GO

CREATE OR ALTER PROCEDURE spHistorial_Expediente
  @expediente_id INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        h.historial_id,
        h.fecha,
        est.nombre AS estado,
        u.nombre AS usuario,
        h.justificacion
    FROM HistorialEstados h
    INNER JOIN EstadosExpediente est ON h.estado_id = est.estado_id
    INNER JOIN Usuarios u ON h.usuario_id = u.usuario_id
    WHERE h.expediente_id = @expediente_id
    ORDER BY h.fecha DESC;
END;
GO
