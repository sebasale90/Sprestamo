export default function handler(req, res) {
  res.json({
    mensaje: "reportes activos",
    prestado: 0,
    cobrado: 0,
    ganancia: 0
  });
}