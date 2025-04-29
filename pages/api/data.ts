
let data = {
  target: 3000,
  collected: 0,
  contributors: 0,
};

export default function handler(req: any, res: any) {
  if (req.method === "GET") {
    res.status(200).json(data);
  } else if (req.method === "POST") {
    data = req.body;
    res.status(200).json({ message: "Data updated" });
  }
}
