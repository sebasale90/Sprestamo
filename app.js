const e = React.createElement;

function App() {
  const [clientes, setClientes] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/clientes")
      .then(r => r.json())
      .then(setClientes)
      .catch(err => console.log("ERROR API:", err));
  }, []);

  return e("div", { style: { padding: 20 } },

    e("h1", null, "💰 Sistema Préstamos PRO"),

    e("h2", null, "Clientes"),

    clientes.length === 0
      ? e("p", null, "No hay datos o API no responde")
      : clientes.map(c =>
          e("div", { key: c.id }, "👤 " + c.nombre)
        )
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(e(App));