import clientPromise from "../../lib/mongo";

function generarCuotas(monto, meses) {
  const cuota = monto / meses;
  return Array.from({ length: meses }).map((_, i) => ({
    numero: i + 1,
    monto: cuota,
    estado: "pendiente",
  }));
}

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("prestamos_pro");
  const col = db.collection("prestamos");

  try {
    if (req.method === "GET") {
      const prestamos = await col.find().toArray();
      return res.status(200).json(prestamos);
    }

    if (req.method === "POST") {
      const body = JSON.parse(req.body);

      // Validación básica
      if (!body.clienteId || !body.monto) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
      }

      const monto = Number(body.monto);
      const meses = Number(body.meses) || 6;

      const prestamo = {
        clienteId: body.clienteId,
        monto,
        meses,
        cuotas: generarCuotas(monto, meses),
        createdAt: new Date(),
      };

      await col.insertOne(prestamo);

      // Devuelve la lista actualizada de préstamos
      const prestamos = await col.find().toArray();
      return res.status(200).json(prestamos);
    }

    // Método no permitido
    return res.status(405).json({ error: "Método no permitido" });
  } catch (error) {
    console.error("Error en /api/prestamos:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}