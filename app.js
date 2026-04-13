const e = React.createElement;

/* ====== ESTILOS ====== */
const styles = {
  header: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "20px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
  },

  card: {
    background: "#111a2e",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.05)"
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "6px 0",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "#0b1220",
    color: "#fff"
  },

  button: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg,#4f8cff,#6f6bff)",
    color: "white",
    fontWeight: "600",
    marginTop: "10px"
  },

  item: {
    padding: "10px",
    borderBottom: "1px solid rgba(255,255,255,0.05)"
  },

  tag: {
    fontSize: "12px",
    opacity: 0.7
  }
};

function App() {
  const [clientes, setClientes] = React.useState([]);
  const [prestamos, setPrestamos] = React.useState([]);

  const [nombre, setNombre] = React.useState("");
  const [telefono, setTelefono] = React.useState("");

  const [clienteId, setClienteId] = React.useState("");
  const [monto, setMonto] = React.useState("");

  React.useEffect(() => {
    fetch("/api/clientes").then(r => r.json()).then(setClientes);
    fetch("/api/prestamos").then(r => r.json()).then(setPrestamos);
  }, []);

  function crearCliente() {
    fetch("/api/clientes", {
      method: "POST",
      body: JSON.stringify({ nombre, telefono })
    }).then(() => location.reload());
  }

  function crearPrestamo() {
    fetch("/api/prestamos", {
      method: "POST",
      body: JSON.stringify({ clienteId, monto })
    }).then(() => location.reload());
  }

  return e("div", { className: "container" },

    e("div", { style: styles.header }, "🏦 Préstamos Pro"),

    e("div", { style: styles.grid },

      /* ===== CLIENTES ===== */
      e("div", { style: styles.card },

        e("h3", null, "👤 Clientes"),

        e("input", {
          style: styles.input,
          placeholder: "Nombre",
          value: nombre,
          onChange: e => setNombre(e.target.value)
        }),

        e("input", {
          style: styles.input,
          placeholder: "Teléfono",
          value: telefono,
          onChange: e => setTelefono(e.target.value)
        }),

        e("button", { style: styles.button, onClick: crearCliente }, "Crear cliente"),

        e("div", null,
          clientes.map(c =>
            e("div", { style: styles.item, key: c.id },
              e("div", null, "👤 " + c.nombre),
              e("div", { style: styles.tag }, c.telefono)
            )
          )
        )
      ),

      /* ===== PRÉSTAMOS ===== */
      e("div", { style: styles.card },

        e("h3", null, "💰 Préstamos"),

        e("select", {
          style: styles.input,
          value: clienteId,
          onChange: e => setClienteId(e.target.value)
        },

          e("option", null, "Seleccionar cliente"),

          clientes.map(c =>
            e("option", { value: c.id }, c.nombre)
          )
        ),

        e("input", {
          style: styles.input,
          placeholder: "Monto",
          value: monto,
          onChange: e => setMonto(e.target.value)
        }),

        e("button", { style: styles.button, onClick: crearPrestamo }, "Crear préstamo"),

        e("div", null,
          prestamos.map(p =>
            e("div", { style: styles.item, key: p.id },
              "💰 $" + p.monto,
              e("div", { style: styles.tag }, "Cliente ID: " + p.clienteId)
            )
          )
        )
      )

    )
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(e(App));