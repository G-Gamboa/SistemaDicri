USE DicriDB;
GO

-- Contraseña de todos los usuarios de prueba: 123456
-- Hash generado con bcrypt, cost factor 10
INSERT INTO Usuarios (nombre, email, password_hash, rol_id, activo)
VALUES
    ('Tecnico Demo',      'tecnico@dicri.local',      '$2b$10$YyEovNW5VKXSoTznhp62.uu/JL2xGdSshC6dNKI5lFtcmP4lIYuUq', 1, 1),
    ('Coordinador Demo',  'coordinador@dicri.local',  '$2b$10$YyEovNW5VKXSoTznhp62.uu/JL2xGdSshC6dNKI5lFtcmP4lIYuUq', 2, 1),
    ('Admin Demo',        'admin@dicri.local',        '$2b$10$YyEovNW5VKXSoTznhp62.uu/JL2xGdSshC6dNKI5lFtcmP4lIYuUq', 3, 1);
