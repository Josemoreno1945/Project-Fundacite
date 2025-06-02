import { getTa } from "../models/TipoArch.model.js";





//---------------------------------Get---------------------------------------
export const getTipoArch = async (req,res)=>{
    try{
        const rows = await getTa()
        res.json(rows);
    }catch(error){
        console.error("Error obteniendo tipos:", error);
        res.status(500).send("Error obteniendo tipos");
    }
}
