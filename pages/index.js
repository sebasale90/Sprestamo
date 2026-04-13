import { useEffect, useState } from "react";

export default function Home() {
  const [clientes, setClientes] = useState([]);
  const [prestamos, setPrestamos] = useState([]);

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

  const [clienteId, setClienteId] = useState("");
  const [monto, setMonto] = useState("");

  async function cargarDatos() {
    const c = await fetch("/api/clientes").then(r => r.json());
    const p = await fetch("/api/prestamos").then(r => r.json());

    setClientes(c);
    setPrestamos(p);
  }

  useEffect(() => {
    cargarDatos();
  }, []);

  async function crearCliente() {
    await fetch("/api/clientes", {
      method: "POST",
      body: JSON.stringify({ nombre, telefono })
    });

    setNombre("");
    setTelefono("");
    cargarDatos();
  }

  async function crearPrestamo() {
    await fetch("/api/prestamos", {
      method: "POST",
      body: JSON.stringify({ clienteId, monto })
    });

    setMonto("");
    cargarDatos();
  }

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>🏦 Banco Pro</h1>

      <h2>Clientes</h2>
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
      />
      <input
        placeholder="Teléfono"
        value={telefono}
        onChange={e => setTelefono(e.target.value)}
      />
      <button onClick={crearCliente}>Crear cliente</button>

      {clientes.map(c => (
        <div key={c._id}>👤 {c.nombre}</div>
      ))}

      <hr />

      <h2>Préstamos</h2>

      <select onChange={e => setClienteId(e.target.value)}>
        <option>Seleccionar cliente</option>
        {clientes.map(c => (
          <option key={c._id} value={c._id}>
            {c.nombre}
          </option>
        ))}
      </select>

      <input
        placeholder="Monto"
        value={monto}
        onChange={e => setMonto(e.target.value)}
      />

      <button onClick={crearPrestamo}>Crear préstamo</button>

      <hr />

      <h2>Resumen</h2>
      <p>Total clientes: {clientes.length}</p>
      <p>Total préstamos: {prestamos.length}</p>
    </div>
  );
}