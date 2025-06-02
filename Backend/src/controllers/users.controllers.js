import { getU} from "../models/users.model.js"



//---------------------------------Get---------------------------------------
export const getUsers  = async (req,res)=>{
    try{
        const rows = await getU()
        res.json(rows);
    }catch(error){
        console.error("Error getting user:", error);
        res.status(500).send("Error getting user");
    }
}


/*
//---------------------------------Get---------------------------------------
export const getDepartmentsId = async(req,res)=>{
    try{
        const id=req.params.id
        const rows = await getDeptid(id)

        if (!rows || rows.length === 0){
            return res.status(404).json({ messaje : "Department not found"});
        }
        res.json(rows);

    }catch(error){
        console.error("Error getting department:", error);
        res.status(500).send("Error getting department");
    }
}


//-------------------------------Post-----------------------------------------
export const postDeparments = async(req,res)=>{
    try{
        const data=req.body
        const  rows = await postDept(data)
        return res.json(rows)
    }   
    catch(error){
        console.error("Error when creating department:", error);
        res.status(500).send("Error when creating department");
    } 
}

*/
