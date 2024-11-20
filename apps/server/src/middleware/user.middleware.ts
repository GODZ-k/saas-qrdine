import { AuthObject, clerkClient, getAuth } from "@clerk/express"
import { NextFunction, Request , Response } from "express"
import { roles } from "../validation/interfaces.js"

export const requireUser = async ( req:Request , res:Response , next: NextFunction):Promise<any> => {
    const auth:AuthObject = getAuth(req)

    if (!auth || !auth.userId) {
        return res.status(401).json({ message: 'forbidden' });
    }

    try {
        const role = (auth.sessionClaims?.unsafeMetadata as { role?: string})?.role


        if(role !== roles.USER){
            return res.status(401).json({ message: 'You are not authenticated.' });
        }

        req.user = auth.userId

        next()

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error });
    }
}