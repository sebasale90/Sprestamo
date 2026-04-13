export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.status(200).json({
    prestado: 0,
    cobrado: 0,
    ganancia: 0,
    estado: "API funcionando"
  });
}