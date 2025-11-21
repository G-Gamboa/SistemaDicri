import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Layout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    return location.pathname.startsWith(path) && path !== "/";
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-left">
          <div className="app-logo-box">MP</div>
          <div className="app-logo-text">
            <span className="app-logo-text-main">
              Ministerio Público de Guatemala
            </span>
            <span className="app-logo-text-sub">
              Dirección de Investigación Criminalística · Sistema de Evidencias
            </span>
            <nav className="app-nav">
              <Link
                to="/"
                className={
                  "app-nav-link " + (isActive("/") ? "app-nav-link-active" : "")
                }
              >
                Expedientes
              </Link>
              <Link
                to="/expedientes/nuevo"
                className={
                  "app-nav-link " +
                  (isActive("/expedientes/nuevo")
                    ? "app-nav-link-active"
                    : "")
                }
              >
                Nuevo expediente
              </Link>
              <Link
                to="/reportes"
                className={
                  "app-nav-link " +
                  (isActive("/reportes") ? "app-nav-link-active" : "")
                }
              >
                Reportes
              </Link>
            </nav>
          </div>
        </div>

        <div className="app-header-right">
          {user && (
            <>
              <span>
                Usuario: {user.nombre} ({user.rol})
              </span>
              <button
                onClick={handleLogout}
                className="btn btn-secondary"
                style={{ marginTop: "6px", fontSize: "12px", padding: "4px 10px" }}
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </header>

      <main className="app-main">
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
