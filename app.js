const e = React.createElement;

function App() {
  const [clientes, setClientes] = React.useState([]);
  const [prestamos, setPrestamos] = React.useState([]);

  const [nombre, setNombre] = React.useState("");
  const [telefono, setTelefono] = React.useState("");

  const [clienteId, setClienteId] = React.useState("");
  const [monto, setMonto] = React.useState("");

  // Cargar todo
  React.useEffect(() => {
    cargarClientes();
    cargarPrestamos();
  }, []);

  function cargarClientes() {
    fetch("/api/clientes")
      .then(r => r.json())
      .then(setClientes)
      .catch(err => console.log("error clientes", err));
  }

  function cargarPrestamos() {
    fetch("/api/prestamos")
      .then(r => r.json())
      .then(setPrestamos)
      .catch(err => console.log("error prestamos", err));
  }

  function crearCliente() {
    fetch("/api/clientes", {
      method: "POST",
      body: JSON.stringify({ nombre, telefono })
    }).then(() => {
      setNombre("");
      setTelefono("");
      cargarClientes();
    });
  }

  function crearPrestamo() {
    fetch("/api/prestamos", {
      method: "POST",
      body: JSON.stringify({ clienteId, monto })
    }).then(() => {
      setMonto("");
      cargarPrestamos();
    });
  }

  return e("div", { style: { fontFamily: "Arial", padding: 20 } },

    e("h1", null, "🏦 Sistema de Préstamos PRO"),

    // ================= CLIENTES =================
    e("h2", null, "👤 Clientes"),

    e("input", {
      placeholder: "Nombre",
      value: nombre,
      onChange: ev => setNombre(ev.target.value)
    }),

    e("input", {
      placeholder: "Teléfono",
      value: telefono,
      onChange: ev => setTelefono(ev.target.value)
    }),

    e("button", { onClick: crearCliente }, "Crear cliente"),

    clientes.length === 0
      ? e("p", null, "No hay clientes")
      : clientes.map(c =>
          e("div", { key: c.id }, `👤 ${c.nombre} - ${c.telefono}`)
        ),

    // ================= PRÉSTAMOS =================
    e("h2", null, "💰 Préstamos"),

    e("select", {
      value: clienteId,
      onChange: ev => setClienteId(ev.target.value)
    },
      e("option", null, "Seleccionar cliente"),
      clientes.map(c =>
        e("option", { value: c.id }, c.nombre)
      )
    ),

    e("input", {
      placeholder: "Monto",
      value: monto,
      onChange: ev => setMonto(ev.target.value)
    }),

    e("button", { onClick: crearPrestamo }, "Crear préstamo"),

    prestamos.length === 0
      ? e("p", null, "No hay préstamos")
      : prestamos.map(p =>
          e("div", { key: p.id },
            `💰 Cliente: ${p.clienteId} | $${p.monto}`
          )
        )
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(e(App));