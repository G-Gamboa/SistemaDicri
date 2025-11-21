import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosClient.js";
import { useAuth } from "../context/AuthContext.jsx";

const ExpedienteDetalle = () => {
  const { id } = useParams();
  const [expediente, setExpediente] = useState(null);
  const [indicios, setIndicios] = useState([]);
  const [historial, setHistorial] = useState([]);
  const ultimoRechazo = historial.find((h) => h.estado === "Rechazado");

  const [nuevoIndicio, setNuevoIndicio] = useState({
    descripcion: "",
    color: "",
    tamano: "",
    peso: "",
    ubicacion: ""
  });
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const [mostrarRechazo, setMostrarRechazo] = useState(false);
  const [justificacionRechazo, setJustificacionRechazo] = useState("");
  const [cargandoRechazo, setCargandoRechazo] = useState(false);

  const { user } = useAuth();

  const loadData = async () => {
    setCargando(true);
    try {
      const expRes = await axios.get("/expedientes");
      const exp = expRes.data.find(
        (e) => e.expediente_id === parseInt(id, 10)
      );
      setExpediente(exp);

      const indRes = await axios.get(`/indicios/${id}`);
      setIndicios(indRes.data);

      const histRes = await axios.get(`/historial/${id}`);
      setHistorial(histRes.data);
    } catch (err) {
      setMensaje("Error al cargar el expediente");
    } finally {
      setCargando(false);
    }
  };


  useEffect(() => {
    loadData();
  }, [id]);

  const handleChangeIndicio = (e) => {
    const { name, value } = e.target;
    setNuevoIndicio((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgregarIndicio = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!nuevoIndicio.descripcion.trim()) {
      setMensaje("La descripción del indicio es obligatoria");
      return;
    }

    try {
      await axios.post(`/indicios/${id}`, {
        ...nuevoIndicio,
        peso: nuevoIndicio.peso ? parseFloat(nuevoIndicio.peso) : null
      });
      setMensaje("Indicio agregado correctamente");
      setNuevoIndicio({
        descripcion: "",
        color: "",
        tamano: "",
        peso: "",
        ubicacion: ""
      });
      await loadData();
    } catch (err) {
      setMensaje("Error al agregar indicio");
    }
  };

  const handleAprobar = async () => {
    setMensaje("");
    try {
      await axios.put(`/expedientes/${id}/aprobar`);
      setMensaje("Expediente aprobado correctamente");
      await loadData();
    } catch {
      setMensaje("Error al aprobar el expediente");
    }
  };

  const handleMostrarRechazo = () => {
    setMostrarRechazo((prev) => !prev);
    setJustificacionRechazo("");
  };

  const handleEnviarRechazo = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!justificacionRechazo.trim()) {
      setMensaje("La justificación de rechazo es obligatoria");
      return;
    }

    try {
      setCargandoRechazo(true);
      await axios.put(`/expedientes/${id}/rechazar`, {
        justificacion: justificacionRechazo
      });
      setMensaje("Expediente rechazado correctamente");
      setMostrarRechazo(false);
      setJustificacionRechazo("");
      await loadData();
    } catch {
      setMensaje("Error al rechazar el expediente");
    } finally {
      setCargandoRechazo(false);
    }
  };

  if (cargando && !expediente) return <p>Cargando...</p>;
  if (!expediente) return <p>No se encontró el expediente</p>;

  return (
    <div className="page-container">
      {}
      <div className="card">
        <div className="section-header">
          <h2>Detalle de expediente {expediente.codigo}</h2>
          <span className="badge">{expediente.estado}</span>
        </div>
        <p>
          <strong>Descripción:</strong> {expediente.descripcion}
        </p>
        <p>
          <strong>Técnico responsable:</strong> {expediente.tecnico}
        </p>

        {expediente.estado === "Rechazado" && ultimoRechazo && ultimoRechazo.justificacion && (
          <div
            style={{
              marginTop: "12px",
              padding: "10px 12px",
              borderRadius: "8px",
              backgroundColor: "#0A1A45",
              border: "1px solid #D4A638"
            }}
          >
            <p style={{ margin: 0, color: "#D4A638", fontWeight: 600 }}>
              Motivo de rechazo:
            </p>
            <p style={{ margin: 0, fontSize: "14px" }}>
              {ultimoRechazo.justificacion}
            </p>
            <p style={{ margin: 0, marginTop: "4px", fontSize: "12px", opacity: 0.8 }}>
              Por: {ultimoRechazo.usuario} ·{" "}
              {new Date(ultimoRechazo.fecha).toLocaleString()}
            </p>
          </div>
        )}
      </div>


      {}
      <div className="card">
        <div className="section-header">
          <h3>Indicios registrados</h3>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Color</th>
                <th>Tamaño</th>
                <th>Peso</th>
                <th>Ubicación</th>
                <th>Técnico</th>
                <th>Fecha registro</th>
              </tr>
            </thead>
            <tbody>
              {indicios.length === 0 && (
                <tr>
                  <td colSpan="7">No hay indicios registrados</td>
                </tr>
              )}
              {indicios.map((i) => (
                <tr key={i.indicio_id}>
                  <td>{i.descripcion}</td>
                  <td>{i.color}</td>
                  <td>{i.tamano}</td>
                  <td>{i.peso}</td>
                  <td>{i.ubicacion}</td>
                  <td>{i.tecnico}</td>
                  <td>{new Date(i.fecha_registro).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {user && (user.rol === "Tecnico" || user.rol === "Administrador") && (
          <div style={{ marginTop: "20px" }}>
            <h3>Agregar indicio</h3>
            <form onSubmit={handleAgregarIndicio}>
              <div className="form-field">
                <label>Descripción</label>
                <textarea
                  name="descripcion"
                  value={nuevoIndicio.descripcion}
                  onChange={handleChangeIndicio}
                  rows={3}
                />
              </div>
              <div className="form-field">
                <label>Color</label>
                <input
                  name="color"
                  value={nuevoIndicio.color}
                  onChange={handleChangeIndicio}
                />
              </div>
              <div className="form-field">
                <label>Tamaño</label>
                <input
                  name="tamano"
                  value={nuevoIndicio.tamano}
                  onChange={handleChangeIndicio}
                />
              </div>
              <div className="form-field">
                <label>Peso</label>
                <input
                  name="peso"
                  value={nuevoIndicio.peso}
                  onChange={handleChangeIndicio}
                />
              </div>
              <div className="form-field">
                <label>Ubicación</label>
                <input
                  name="ubicacion"
                  value={nuevoIndicio.ubicacion}
                  onChange={handleChangeIndicio}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Agregar indicio
              </button>
            </form>
          </div>
        )}
      </div>

      {}
      {user && (user.rol === "Coordinador" || user.rol === "Administrador") && (
        <div className="card">
          <h3>Revisión de expediente</h3>
          <p>
            Como coordinador puede aprobar el expediente o rechazarlo indicando
            una justificación para que el técnico realice los ajustes.
          </p>
          <div style={{ marginBottom: "10px" }}>
            <button
              onClick={handleAprobar}
              className="btn btn-primary"
              style={{ marginRight: "10px" }}
            >
              Aprobar expediente
            </button>
            <button
              onClick={handleMostrarRechazo}
              className="btn btn-danger"
            >
              {mostrarRechazo ? "Cancelar rechazo" : "Rechazar expediente"}
            </button>
          </div>

          {mostrarRechazo && (
            <form onSubmit={handleEnviarRechazo}>
              <div className="form-field">
                <label>Justificación de rechazo</label>
                <textarea
                  value={justificacionRechazo}
                  onChange={(e) =>
                    setJustificacionRechazo(e.target.value)
                  }
                  rows={4}
                  placeholder="Describa claramente los motivos del rechazo para que el técnico pueda corregir el expediente."
                />
              </div>
              <button
                type="submit"
                className="btn btn-danger"
                disabled={cargandoRechazo}
              >
                {cargandoRechazo
                  ? "Enviando rechazo..."
                  : "Confirmar rechazo"}
              </button>
            </form>
          )}
        </div>
      )}

      {mensaje && (
        <div className="page-container">
          <p>{mensaje}</p>
        </div>
      )}
    </div>
  );
};

export default ExpedienteDetalle;
