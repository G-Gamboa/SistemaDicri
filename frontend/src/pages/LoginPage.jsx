import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Credenciales inválidas. Verifique su correo y contraseña.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-panel">
        {}
        <div className="login-left">
          {}
          <img src="/mp-banner.jpg" alt="Ministerio Público de Guatemala" />
          <div className="login-left-overlay" />
          <div className="login-left-content">
            <div className="login-left-title">
              Dirección de Investigación Criminalística
            </div>
            <div className="login-left-subtitle">
              Sistema para registro y control de evidencias e indicios
              criminalísticos.
            </div>
          </div>
        </div>

        {}
        <div className="login-right">
          <div className="login-header">
            <div className="login-logo">
              MP
              <span>Ministerio Público de Guatemala</span>
            </div>
            <div className="login-title">Ingreso al sistema DICRI Evidencias</div>
            <div className="login-subtitle">
              Ingrese con sus credenciales institucionales para registrar o
              revisar expedientes.
            </div>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Correo institucional</label>
              <input
                type="email"
                placeholder="usuario@mp.gob.gt"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
            </div>
            <div className="form-field">
              <label>Contraseña</label>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={cargando}
            >
              {cargando ? "Ingresando..." : "Ingresar"}
            </button>

            {error && <div className="login-error">{error}</div>}

            <div className="login-hint">
              Para fines de prueba puede utilizar:
              <br />
              tecnico@dicri.local / 123456
              <br />
              coordinador@dicri.local / 123456
              <br />
              admin@dicri.local / 123456
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
