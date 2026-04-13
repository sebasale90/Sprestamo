const e = React.createElement;

function App() {
  const [clientes, setClientes] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/clientes")
      .then(r => r.json())
      .then(setClientes);
  }, []);

  return e("div", { style: { padding: 20, fontFamily: "Arial" } },

    e("h1", null, "💰 Sistema Préstamos PRO"),

    e("h2", null, "Clientes"),

    clientes.map(c =>
      e("div", { key: c.id }, "👤 " + c.nombre)
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(e(App));
