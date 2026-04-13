let clientes = [];

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method === "GET") {
    return res.status(200).json(clientes);
  }

  if (req.method === "POST") {
    try {
      const body = req.body ? JSON.parse(req.body) : {};

      const nuevo = {
        id: Date.now(),
        nombre: body.nombre || "Sin nombre",
        telefono: body.telefono || ""
      };

      clientes.push(nuevo);

      return res.status(200).json(nuevo);
    } catch (e) {
      return res.status(500).json({ error: "Error clientes" });
    }
  }

  return res.status(405).json({ error: "Método no permitido" });
}