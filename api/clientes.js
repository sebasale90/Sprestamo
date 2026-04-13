let clientes = [];

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method === "GET") {
    return res.json(clientes);
  }

  if (req.method === "POST") {
    const body = JSON.parse(req.body || "{}");

    const nuevo = {
      id: Date.now().toString(),
      nombre: body.nombre,
      telefono: body.telefono
    };

    clientes.push(nuevo);

    return res.json(nuevo);
  }

  res.status(405).end();
}