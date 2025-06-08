import { getR } from "../models/roles.model.js";

//---------------------------------Get---------------------------------------
export const getRoles = async (req, res) => {
  try {
    const rows = await getR();
    res.json(rows);
  } catch (error) {
    console.error("Error getting roles:", error);
    res.status(500).send("Error getting roles");
  }
};
