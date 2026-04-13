let prestamos = [];

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method === "GET") {
    return res.json(prestamos);
  }

  if (req.method === "POST") {
    const body = JSON.parse(req.body || "{}");

    const nuevo = {
      id: Date.now(),
      clienteId: body.clienteId,
      monto: body.monto,
      fecha: new Date()
    };

    prestamos.push(nuevo);

    return res.json(nuevo);
  }

  res.status(405).end();
}