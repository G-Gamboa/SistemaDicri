import { useEffect, useState } from "react";
import axios from "../api/axiosClient.js";
import { Link } from "react-router-dom";

const ExpedientesList = () => {
  const [items, setItems] = useState([]);
  const [filtros, setFiltros] = useState({
    estado: "",
    fechaInicio: "",
    fechaFin: ""
  });

  const loadData = async () => {
    const params = {};
    if (filtros.estado) params.estado = filtros.estado;
    if (filtros.fechaInicio) params.fechaInicio = filtros.fechaInicio;
    if (filtros.fechaFin) params.fechaFin = filtros.fechaFin;

    const res = await axios.get("/expedientes", { params });
    setItems(res.data);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleBuscar = async (e) => {
    e.preventDefault();
    await loadData();
  };

  return (
    <>
      <div className="card">
        <div className="section-header">
          <div>
            <div className="page-title">Expedientes DICRI</div>
            <div className="page-subtitle">
              Consulta de expedientes y estado de revisión de evidencias.
            </div>
          </div>
          <Link to="/expedientes/nuevo" className="btn btn-primary">
            Registrar nuevo expediente
          </Link>
        </div>

        <form
          onSubmit={handleBuscar}
          style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
        >
          <div className="form-field" style={{ minWidth: "180px", flex: "1" }}>
            <label>Estado</label>
            <select
              name="estado"
              value={filtros.estado}
              onChange={handleChange}
            >
              <option value="">Todos</option>
              <option value="Registrado">Registrado</option>
              <option value="En revisión">En revisión</option>
              <option value="Rechazado">Rechazado</option>
              <option value="Aprobado">Aprobado</option>
            </select>
          </div>
          <div className="form-field" style={{ minWidth: "160px" }}>
            <label>Fecha inicio</label>
            <input
              type="date"
              name="fechaInicio"
              value={filtros.fechaInicio}
              onChange={handleChange}
            />
          </div>
          <div className="form-field" style={{ minWidth: "160px" }}>
            <label>Fecha fin</label>
            <input
              type="date"
              name="fechaFin"
              value={filtros.fechaFin}
              onChange={handleChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              paddingBottom: "4px"
            }}
          >
            <button type="submit" className="btn btn-secondary">
              Aplicar filtros
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <div className="section-header">
          <h3>Listado de expedientes</h3>
          <span style={{ fontSize: "13px", opacity: 0.8 }}>
            Total: {items.length}
          </span>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Descripción</th>
                <th>Técnico</th>
                <th>Estado</th>
                <th>Fecha registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan="6">No se encontraron expedientes con los filtros seleccionados.</td>
                </tr>
              )}
              {items.map((e) => (
                <tr key={e.expediente_id}>
                  <td>{e.codigo}</td>
                  <td>{e.descripcion}</td>
                  <td>{e.tecnico}</td>
                  <td>
                    <span className="badge">{e.estado}</span>
                  </td>
                  <td>{new Date(e.fecha_registro).toLocaleString()}</td>
                  <td>
                    <Link to={`/expedientes/${e.expediente_id}`} className="btn-link">
                      Ver detalle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ExpedientesList;
