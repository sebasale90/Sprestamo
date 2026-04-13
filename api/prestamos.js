let prestamos = [];

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method === "GET") {
    return res.status(200).json(prestamos);
  }

  if (req.method === "POST") {
    try {
      const body = req.body ? JSON.parse(req.body) : {};

      const p = {
        id: Date.now(),
        clienteId: body.clienteId,
        monto: body.monto || 0,
        interes: body.interes || 0,
        meses: body.meses || 1
      };

      prestamos.push(p);

      return res.status(200).json(p);
    } catch (e) {
      return res.status(500).json({ error: "Error prestamos" });
    }
  }

  return res.status(405).json({ error: "Método no permitido" });
}