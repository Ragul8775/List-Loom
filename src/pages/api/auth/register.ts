import { NextApiRequest,NextApiResponse } from "next";
import { createUser } from "@/models/user";

const handler = async (req:NextApiRequest, res:NextApiResponse)=>{
    if(req.method === "POST"){
        const {name, email, password} = req.body;
        try{
            const user = await createUser(name, email, password);
            res.status(201).json(user);
        }catch(error)
        {
            res.status(500).json({error:"Failed to Create User"})
        }
    }else{
        res.setHeader('Allow',['POST']);
        res.status(405).end(`Method ${req.method} not Allowed`)
    }
};

export default handler;
