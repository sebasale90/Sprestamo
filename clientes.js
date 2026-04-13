import clientPromise from "../../lib/mongo";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("prestamos_pro");
  const col = db.collection("clientes");

  if (req.method === "GET") {
    const clientes = await col.find().toArray();
    return res.status(200).json(clientes);
  }

  if (req.method === "POST") {
    try {
      const body = JSON.parse(req.body);

      const nuevo = {
        nombre: body.nombre,
        telefono: body.telefono,
        createdAt: new Date()
      };

      await col.insertOne(nuevo);

      // Devuelve la lista actualizada de clientes
      const clientes = await col.find().toArray();
      return res.status(200).json(clientes);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Error creando cliente" });
    }
  }

  return res.status(405).end();
}