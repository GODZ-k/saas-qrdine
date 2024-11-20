import { Response , Request } from "express"
import { demoData, demoType } from "../Types/demo.types.js"
import prisma from "../config/db.config.js"



const demoController = async(req:Request , res:Response):Promise<any> =>{
    const inputData:demoData = req.body
    const payload = demoType.safeParse(inputData)

    
    if(!payload.success){
        console.log(payload.error.errors)
        return res.status(400).json({
            msg:payload.error.errors[0].message
        })
    }

    const { firstName , lastName ,  email , preferedTime , phone , message } = payload.data

    const user = await prisma.demo.findFirst({
        where:{
            OR:[
                {email},
                {phone}
            ]
        }
    })

    if(user){
        return res.status(400).json({
            msg:"you already have take a demo"
        })
    }

    await prisma.demo.create({
        data:{
            email,
            phone,
            firstName,
            lastName:lastName || "",
            message,
            preferedTime: preferedTime ? new Date(preferedTime) : " ", // Parse date if provided
        }
    })


    return res.status(200).json({
        msg:"Demo scheduled successfully"
    })
}



export default demoController