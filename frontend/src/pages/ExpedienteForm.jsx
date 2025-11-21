import { useState } from "react";
import axios from "../api/axiosClient.js";
import { useNavigate } from "react-router-dom";

const ExpedienteForm = () => {
  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!codigo.trim()) {
      setMensaje("El código del expediente es obligatorio.");
      return;
    }

    setCargando(true);
    try {
      await axios.post("/expedientes", { codigo, descripcion });
      setMensaje("Expediente creado correctamente.");
      navigate("/");
    } catch (err) {
      setMensaje("Error al crear expediente.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="card">
      <div className="section-header">
        <div>
          <div className="page-title">Nuevo expediente DICRI</div>
          <div className="page-subtitle">
            Registre los datos generales del expediente y asigne un código único.
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Código de expediente</label>
          <input
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Ejemplo: DICRI-2025-0001"
          />
        </div>
        <div className="form-field">
          <label>Descripción general</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={4}
            placeholder="Descripción breve de los hechos o contexto del expediente."
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={cargando}>
          {cargando ? "Guardando..." : "Guardar expediente"}
        </button>
        {mensaje && <div className="alert">{mensaje}</div>}
      </form>
    </div>
  );
};

export default ExpedienteForm;
