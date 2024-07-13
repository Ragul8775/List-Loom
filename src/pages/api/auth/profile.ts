import { NextApiResponse } from "next";
import { getUserById } from "@/models/user";
import { authMiddleware } from "@/middlewares/authmiddleware";
import { errorMiddleware } from "@/middlewares/errorMiddleware";
import { AuthenticatedRequest } from "@/middlewares/authmiddleware";

const handler =async (req:AuthenticatedRequest, res:NextApiResponse) => {
    const user = await getUserById(req.user.id);
    res.status(200).json(user);
    
}


export default errorMiddleware(authMiddleware(handler));