import { Deta } from "deta";

const deta = Deta(process.env.DETA_KEY);

const base = deta.Base(process.env.DETA_BASE);

const data = async (req, res) => {
  let { body, method } = req;

  if (method === "GET") {
    const value = await base.fetch();
    res.status(200).json(value.items);
  } else if (method === "POST") {
    body = JSON.parse(body);
    res.status(201).json(await base.put(body));
  }
};

export default data;
