const e = React.createElement;

function App() {
  const [clientes, setClientes] = React.useState([]);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    fetch("/api/clientes")
      .then(async (r) => {
        if (!r.ok) throw new Error("API error");
        return r.json();
      })
      .then(setClientes)
      .catch((err) => {
        console.log(err);
        setError("API no responde");
      });
  }, []);

  return e("div", { style: { padding: 20 } },

    e("h1", null, "💰 Sistema Préstamos PRO"),

    error && e("p", { style: { color: "red" } }, error),

    e("h2", null, "Clientes"),

    clientes.length === 0
      ? e("p", null, "No hay datos")
      : clientes.map(c =>
          e("div", { key: c.id }, "👤 " + c.nombre)
        )
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(e(App));