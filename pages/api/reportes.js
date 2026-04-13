import clientPromise from "../../lib/mongo";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Método no permitido" });

  try {
    const client = await clientPromise;
    const db = client.db("prestamos_pro");

    const prestamos = await db.collection("prestamos").find().toArray();
    const totalPrestado = prestamos.reduce((acc, p) => acc + Number(p.monto || 0), 0);

    res.status(200).json({
      totalPrestado,
      cantidadPrestamos: prestamos.length,
      estado: "OK",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al calcular reportes" });
  }
}