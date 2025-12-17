import { useEffect, useState } from "react";
import { getMedicamentos, createMedicamento } from "./services/medicamentosService";

function Medicamentos() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    laboratorio: "",
    fechaVencimiento: "",
    cantidad: ""
  });

  const cargarMedicamentos = () => {
    getMedicamentos()
      .then(res => setMedicamentos(res.data))
      .catch(() => alert("Error al cargar medicamentos"));
  };

  useEffect(() => {
    cargarMedicamentos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMedicamento({
        ...form,
        cantidad: parseInt(form.cantidad)
      });
      alert("Medicamento registrado");
      setForm({
        nombre: "",
        laboratorio: "",
        fechaVencimiento: "",
        cantidad: ""
      });
      cargarMedicamentos();
    } catch {
      alert("Error al registrar medicamento");
    }
  };

  return (
    <div>
      <h2>Registrar Medicamento</h2>

      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input name="laboratorio" placeholder="Laboratorio" value={form.laboratorio} onChange={handleChange} required />
        <input type="date" name="fechaVencimiento" value={form.fechaVencimiento} onChange={handleChange} required />
        <input type="number" name="cantidad" placeholder="Cantidad" value={form.cantidad} onChange={handleChange} required />
        <button type="submit">Guardar</button>
      </form>

      <h2>Listado de Medicamentos</h2>

      <ul>
        {medicamentos.map(m => (
          <li key={m.id}>
            {m.nombre} - {m.laboratorio} - {m.cantidad}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Medicamentos;
