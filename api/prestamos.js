let prestamos = [];

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.json(prestamos);
  }

  if (req.method === "POST") {
    const p = {
      id: Date.now(),
      ...req.body
    };

    prestamos.push(p);
    return res.json(p);
  }
}