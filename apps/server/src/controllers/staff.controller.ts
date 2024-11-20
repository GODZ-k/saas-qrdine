import { Response , Request } from "express"

const mainController = async(req:Request , res:Response):Promise<any> =>{
    return res.status(200).json({
        msg:"Everything is working fine"
    })
}



export default mainController