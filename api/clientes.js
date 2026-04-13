import { db } from "../lib/mongo";

export default async function handler(req, res) {
  const database = await db();
  const col = database.collection("clientes");

  if (req.method === "GET") {
    return res.json(await col.find().toArray());
  }

  if (req.method === "POST") {
    const body = JSON.parse(req.body);

    const cliente = {
      nombre: body.nombre,
      telefono: body.telefono,
      createdAt: new Date()
    };

    const r = await col.insertOne(cliente);
    return res.json(r);
  }
}