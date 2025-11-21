import { useEffect, useState } from "react";
import axios from "../api/axiosClient.js";

const Reportes = () => {
  const [items, setItems] = useState([]);
  const [filtros, setFiltros] = useState({
    fechaInicio: "",
    fechaFin: "",
    estado: ""
  });

  const loadData = async () => {
    const params = {};
    if (filtros.fechaInicio) params.fechaInicio = filtros.fechaInicio;
    if (filtros.fechaFin) params.fechaFin = filtros.fechaFin;
    if (filtros.estado) params.estado = filtros.estado;
    const res = await axios.get("/reportes/expedientes", { params });
    setItems(res.data);
  };

  useEffect(() => {
    loadData();
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
    <div>
      <h2>Reportes de expedientes</h2>
      <form onSubmit={handleBuscar} style={{ marginBottom: "10px" }}>
        <label>
          Fecha inicio:
          <input
            type="date"
            name="fechaInicio"
            value={filtros.fechaInicio}
            onChange={handleChange}
          />
        </label>
        <label style={{ marginLeft: "10px" }}>
          Fecha fin:
          <input
            type="date"
            name="fechaFin"
            value={filtros.fechaFin}
            onChange={handleChange}
          />
        </label>
        <label style={{ marginLeft: "10px" }}>
          Estado:
          <select name="estado" value={filtros.estado} onChange={handleChange}>
            <option value="">Todos</option>
            <option value="Registrado">Registrado</option>
            <option value="En revisión">En revisión</option>
            <option value="Rechazado">Rechazado</option>
            <option value="Aprobado">Aprobado</option>
          </select>
        </label>
        <button type="submit" style={{ marginLeft: "10px" }}>
          Buscar
        </button>
      </form>

      <table border="1" cellPadding="5" cellSpacing="0">
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
          {items.map((e) => (
            <tr key={e.expediente_id}>
              <td>{e.codigo}</td>
              <td>{e.descripcion}</td>
              <td>{e.tecnico}</td>
              <td>{e.estado}</td>
              <td>{new Date(e.fecha_registro).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reportes;
