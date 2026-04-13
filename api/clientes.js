let clientes = [];

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.json(clientes);
  }

  if (req.method === "POST") {
    const cliente = {
      id: Date.now(),
      ...req.body
    };

    clientes.push(cliente);
    return res.json(cliente);
  }
}