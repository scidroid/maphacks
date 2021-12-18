import { Deta } from "deta";

const deta = Deta(process.env.DETA_KEY);

const base = deta.Base("donations");

const data = async (req, res) => {
  let { body, method } = req;

  if (method === "GET") {
    const { id } = req.query;
    const value = await base.fetch();
    const donations = value.items.filter((n) => n.cause === id);
    let total = 0;
    donations.forEach((n) => {
      total += parseInt(n.money);
    });
    res.status(200).json({ money: total });
  } else if (method === "POST") {
    body = JSON.parse(body);
    res.status(201).json(await base.put(body));
  }
};

export default data;
