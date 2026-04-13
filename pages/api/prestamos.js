import clientPromise from "../../lib/mongo";

function generarCuotas(monto, meses) {
  const cuota = monto / meses;

  return Array.from({ length: meses }).map((_, i) => ({
    numero: i + 1,
    monto: cuota,
    estado: "pendiente"
  }));
}

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("prestamos_pro");
  const col = db.collection("prestamos");

  if (req.method === "GET") {
    const prestamos = await col.find().toArray();
    return res.status(200).json(prestamos);
  }

  if (req.method === "POST") {
    try {
      const body = JSON.parse(req.body);

      const monto = Number(body.monto);
      const meses = body.meses || 6;

      const prestamo = {
        clienteId: body.clienteId,
        monto,
        meses,
        cuotas: generarCuotas(monto, meses),
        createdAt: new Date()
      };

      const result = await col.insertOne(prestamo);
      return res.status(200).json(result);
    } catch (e) {
      return res.status(500).json({ error: "Error creando préstamo" });
    }
  }

  return res.status(405).end();
}