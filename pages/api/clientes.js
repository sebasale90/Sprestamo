import clientPromise from "../../lib/mongo";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("prestamos_pro");
  const col = db.collection("clientes");

  try {
    if (req.method === "GET") {
      const clientes = await col.find().toArray();
      return res.status(200).json(clientes);
    }

    if (req.method === "POST") {
      const body = req.body;
      if (!body.nombre || !body.telefono) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
      }

      await col.insertOne({ nombre: body.nombre, telefono: body.telefono, createdAt: new Date() });

      const clientes = await col.find().toArray();
      return res.status(200).json(clientes);
    }

    return res.status(405).json({ error: "Método no permitido" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}