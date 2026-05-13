# Sistema DICRI Evidencias

Plataforma web para la gestión de expedientes e indicios criminalísticos desarrollada para la Dirección de Investigación Criminalística del Ministerio Público de Guatemala. Implementa autenticación con JWT, control de acceso por roles, historial de estados y despliegue completo en Docker.

---

## Tecnologías

| Capa | Tecnología |
|---|---|
| Frontend | React 18, Vite, React Router, Axios |
| Backend | Node.js 20, Express, JWT, bcrypt |
| Base de datos | SQL Server 2022, Stored Procedures |
| Infraestructura | Docker, Docker Compose, Nginx |

---

## Arquitectura

Tres servicios orquestados con Docker Compose:

```
dicri-web   → React (Nginx)       → puerto 5173
dicri-api   → Node.js / Express   → puerto 3000
dicri-db    → SQL Server 2022     → puerto 1433
```

El diagrama de arquitectura y el modelo entidad-relación se encuentran en `/docs`.

---

## Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- SQL Server Management Studio (SSMS) para la inicialización de la base de datos

---

## Configuración de variables de entorno

Cree un archivo `.env` en la raíz del proyecto basado en `.env.example`:

```bash
cp .env.example .env
```

Edite `.env` con valores seguros antes de ejecutar el proyecto:

```env
DB_USER=sa
DB_PASSWORD=your_strong_password_here
DB_NAME=DicriDB
JWT_SECRET=your_jwt_secret_here
CORS_ORIGIN=http://localhost:5173
```

---

## Despliegue

### 1. Levantar los contenedores

```bash
docker-compose up --build
```

### 2. Inicializar la base de datos

Conéctese a SQL Server con SSMS:

- **Servidor:** `localhost,1433`
- **Autenticación:** SQL Server
- **Usuario:** valor de `DB_USER`
- **Contraseña:** valor de `DB_PASSWORD`

Ejecute los scripts en orden:

```
1. db/schema.sql      → crea tablas y catálogos
2. db/procedures.sql  → crea stored procedures
3. db/seed.sql        → inserta usuarios de prueba
```

### 3. Acceder al sistema

| Servicio | URL |
|---|---|
| Frontend | http://localhost:5173 |
| API | http://localhost:3000/api |

---

## Credenciales de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Técnico | tecnico@dicri.local | 123456 |
| Coordinador | coordinador@dicri.local | 123456 |
| Administrador | admin@dicri.local | 123456 |

---

## Roles y permisos

| Acción | Técnico | Coordinador | Administrador |
|---|:---:|:---:|:---:|
| Registrar expediente | ✓ | | ✓ |
| Agregar indicios | ✓ | | ✓ |
| Consultar expedientes | ✓ | ✓ | ✓ |
| Aprobar / rechazar | | ✓ | ✓ |
| Ver reportes | ✓ | ✓ | ✓ |

---

## Estructura del proyecto

```
SistemaDicri/
├── backend/
│   ├── src/
│   │   ├── config/          # dbConfig, jwtConfig
│   │   ├── controllers/     # auth, expediente, indicio, reporte, historial
│   │   ├── db/              # pool de conexión
│   │   ├── middleware/       # auth JWT, manejo de errores
│   │   ├── routes/          # definición de rutas
│   │   └── services/        # lógica de negocio
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── api/             # cliente Axios
│   │   ├── components/      # Layout
│   │   ├── context/         # AuthContext
│   │   └── pages/           # LoginPage, ExpedientesList, ExpedienteDetalle, ExpedienteForm, Reportes
│   └── Dockerfile
├── db/
│   ├── schema.sql           # tablas y catálogos
│   ├── procedures.sql       # stored procedures
│   └── seed.sql             # datos de prueba
├── docs/
│   ├── DiagramaArquitectura.png
│   ├── DiagramaER.png
│   └── ManualTécnico.pdf
├── .env.example
└── docker-compose.yml
```

---

## Licencia

Proyecto desarrollado para fines evaluativos.
