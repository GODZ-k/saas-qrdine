import { clerkClient } from "@clerk/express"
import { Response , Request } from "express"
import prisma from "../config/db.config.js"





class User {
    // get current user
    static async currentUser(req:Request , res:Response):Promise<any>{
        const user  = req.user
    
        if(!user){
            return res.status(422).json({
                msg:"User not exists"
            })
        }
    
        const loggedInUser = await prisma.user.findUnique({
            where:{
                id:user,
            },
            include:{
                subscription:true,
                restaurant:true,
                demos:true
            }
        })

        if(!loggedInUser){
            return res.status(422).json({
                success:false,
                msg:"User not exists"
            }) 
        }
    
        console.log(loggedInUser)
        return res.status(200).json({
            success:true,
            loggedInUser,
            msg:"User found succcessfully"
        })
    }

}

export default User