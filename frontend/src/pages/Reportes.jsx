import { useEffect, useState } from "react";
import axios from "../api/axiosClient.js";

const Reportes = () => {
  const [items, setItems] = useState([]);
  const [filtros, setFiltros] = useState({
    fechaInicio: "",
    fechaFin: "",
    estado: ""
  });

  useEffect(() => {
    axios.get("/reportes/expedientes").then((res) => setItems(res.data)).catch(() => {});
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleBuscar = async (e) => {
    e.preventDefault();
    const params = {};
    if (filtros.fechaInicio) params.fechaInicio = filtros.fechaInicio;
    if (filtros.fechaFin) params.fechaFin = filtros.fechaFin;
    if (filtros.estado) params.estado = filtros.estado;
    const res = await axios.get("/reportes/expedientes", { params });
    setItems(res.data);
  };

  return (
    <>
      <div className="card">
        <div className="section-header">
          <div>
            <div className="page-title">Reportes de expedientes</div>
            <div className="page-subtitle">
              Consulta de expedientes filtrada por rango de fecha y estado.
            </div>
          </div>
        </div>

        <form onSubmit={handleBuscar} className="filter-form">
          <div className="form-field filter-field">
            <label>Fecha inicio</label>
            <input
              type="date"
              name="fechaInicio"
              value={filtros.fechaInicio}
              onChange={handleChange}
            />
          </div>
          <div className="form-field filter-field">
            <label>Fecha fin</label>
            <input
              type="date"
              name="fechaFin"
              value={filtros.fechaFin}
              onChange={handleChange}
            />
          </div>
          <div className="form-field filter-field-wide">
            <label>Estado</label>
            <select name="estado" value={filtros.estado} onChange={handleChange}>
              <option value="">Todos</option>
              <option value="Registrado">Registrado</option>
              <option value="En revisión">En revisión</option>
              <option value="Rechazado">Rechazado</option>
              <option value="Aprobado">Aprobado</option>
            </select>
          </div>
          <div className="filter-btn-wrapper">
            <button type="submit" className="btn btn-secondary">
              Aplicar filtros
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <div className="section-header">
          <h3>Resultados</h3>
          <span className="count-label">Total: {items.length}</span>
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
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan="5">No se encontraron expedientes con los filtros seleccionados.</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Reportes;
