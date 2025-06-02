import { getCat } from "../models/cate.model.js";




//---------------------------------Get---------------------------------------
export const getCategorias = async (req,res)=>{
    try{
        const rows = await getCat()
        res.json(rows);
    }catch(error){
        console.error("Error obteniendo categorias:", error);
        res.status(500).send("Error obteniendo categorias");
    }
}
