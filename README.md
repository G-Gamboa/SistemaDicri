# Sistema DICRI Evidencias
Plataforma para la gestión de expedientes e indicios criminalísticos, desarrollada como parte de una prueba técnica. Incluye autenticación por roles, manejo de evidencias, historial de estados, aprobación y rechazo, y despliegue completo en Docker.

## Tecnologías Utilizadas

### Frontend
- React + Vite
- React Router
- Context API
- Fetch API
- Estilos personalizados institucionales

### Backend
- Node.js
- Express.js
- JWT
- MSSQL
- Bcrypt

### Base de Datos
- SQL Server 2022
- Stored Procedures para toda la lógica crítica
- Modelo relacional normalizado

### Infraestructura
- Docker
- Docker Compose

## Arquitectura General

El sistema se compone de tres servicios principales orquestados con Docker Compose:

dicri-web: React (Frontend)
dicri-api: Node.js y Express (Backend)
dicri-db: SQL Server 2022 (Base de datos)

## Modelo Entidad Relación (ER)

Entidades principales:
- Usuarios
- Roles
- Expedientes
- Indicios
- EstadosExpediente
- HistorialEstados

## Requisitos Previos

- Docker Desktop
- SQL Server Management Studio (SSMS)
- Node.js (solo para desarrollo local)

## Instrucciones de Despliegue con Docker

1. Clonar el proyecto o descargar el archivo ZIP.
2. Abrir la terminal en la carpeta raíz del proyecto.
3. Ejecutar:
   docker-compose up --build
4. Abrir SQL Server Management Studio.
5. Conectarse al servidor:
   localhost,1433
   Usuario: sa
   Contraseña: P@assw0rd123
6. Ejecutar los archivos:
   /db/schema.sql
   /db/procedures.sql
7. Acceder al sistema mediante:
   http://localhost:5173

## Acceso al Sistema

Frontend:
http://localhost:5173

Backend (API):
http://localhost:3000/api

## Credenciales de Prueba

Tecnico: tecnico@dicri.local / 123456  
Coordinador: coordinador@dicri.local / 123456  
Administrador: admin@dicri.local / 123456  

## Estructura del Proyecto

/backend  
    /src  
        /routes  
        /controllers  
        /middleware  
        /db  
    Dockerfile  

/frontend  
    /src  
        /pages  
        /components  
        /context  
    Dockerfile  

/db  
    schema.sql  
    procedures.sql  

/docs  
    DiagramaArquitectura.png  
    DiagramaER.png 
    ManualTécnico.PDF 

docker-compose.yml  
README.md  

## Funcionalidades

- Autenticación con JWT  
- Control por roles (Técnico, Coordinador y Administrador)  
- Registro de expedientes  
- Registro de indicios  
- Aprobación y rechazo de expedientes con motivo obligatorio  
- Historial de estados por expediente  
- Reportes por fecha y estado  

## Licencia

Proyecto desarrollado únicamente para fines evaluativos de una prueba técnica.
