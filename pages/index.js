import { useEffect, useState } from "react";

export default function Home() {
  const [clientes, setClientes] = useState([]);
  const [prestamos, setPrestamos] = useState([]);

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [monto, setMonto] = useState("");

  async function cargarDatos() {
    try {
      const c = await fetch("/api/clientes").then((r) => r.json());
      const p = await fetch("/api/prestamos").then((r) => r.json());

      setClientes(Array.isArray(c) ? c : []);
      setPrestamos(Array.isArray(p) ? p : []);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  }

  useEffect(() => {
    cargarDatos();
  }, []);

  async function crearCliente() {
    if (!nombre || !telefono) return alert("Nombre y teléfono son obligatorios");

    try {
      await fetch("/api/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, telefono }),
      });
      setNombre("");
      setTelefono("");
      cargarDatos();
    } catch (error) {
      console.error(error);
    }
  }

  async function crearPrestamo() {
    if (!clienteId || !monto) return alert("Cliente y monto son obligatorios");

    try {
      await fetch("/api/prestamos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clienteId, monto }),
      });
      setMonto("");
      setClienteId("");
      cargarDatos();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Inter, Arial, sans-serif",
        backgroundColor: "#0b1220",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>🏦 Banco Pro - Sistema Financiero</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px",
        }}
      >
        {/* Clientes */}
        <div style={cardStyle}>
          <h3>Clientes</h3>
          <input
            style={inputStyle}
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            style={inputStyle}
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <button style={buttonStyle} onClick={crearCliente}>
            Crear cliente
          </button>

          <div style={{ marginTop: "20px" }}>
            {Array.isArray(clientes) &&
              clientes.map((c) => (
                <div key={c._id}>👤 {c.nombre}</div>
              ))}
          </div>
        </div>

        {/* Préstamos */}
        <div style={cardStyle}>
          <h3>Préstamos</h3>
          <select
            style={inputStyle}
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
          >
            <option value="">Seleccionar cliente</option>
            {Array.isArray(clientes) &&
              clientes.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.nombre}
                </option>
              ))}
          </select>

          <input
            style={inputStyle}
            placeholder="Monto"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />
          <button style={buttonStyle} onClick={crearPrestamo}>
            Crear préstamo
          </button>

          <div style={{ marginTop: "20px" }}>
            {Array.isArray(prestamos) &&
              prestamos.map((p) => (
                <div key={p._id}>💰 {p.monto}</div>
              ))}
          </div>
        </div>

        {/* Resumen */}
        <div style={cardStyle}>
          <h3>Resumen</h3>
          <p>Total clientes: {clientes.length}</p>
          <p>Total préstamos: {prestamos.length}</p>
          <p>
            Total prestado:{" "}
            {prestamos.reduce((acc, p) => acc + Number(p.monto || 0), 0)}
          </p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#121a2b",
  padding: "20px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.05)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "6px 0",
  borderRadius: "8px",
  border: "none",
  background: "#0b1220",
  color: "white",
};

const buttonStyle = {
  padding: "10px",
  width: "100%",
  border: "none",
  borderRadius: "10px",
  background: "linear-gradient(135deg,#4f8cff,#6f6bff)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};