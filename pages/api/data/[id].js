import { Deta } from "deta";

const deta = Deta(process.env.DETA_KEY);

const base = deta.Base(process.env.DETA_BASE);

const dataById = async (req, res) => {
  let {
    body,
    method,
    query: { id },
  } = req;

  if (method === "PUT") {
    body = JSON.parse(body);
    res.status(200).json(await base.put(body));
  } else if (method === "DELETE") {
    res.status(200).json(await base.delete(id));
  }
};

export default dataById;
