import { Request , Response } from "express";
import { AddonInputType, createAddonTypeSchema } from "../Types/addons.types.js";
import { rzp } from "../services/rezorpay.js";


class Addon {
    // create addon
    static async createAddon( req:Request, res:Response):Promise<any>{
        try {
            const user =  req.user
            const sub_id = req.params.sub_id
          
            const inputData:AddonInputType = req.body

            if(!inputData){
                return res.status(400).json({
                    msg:"All fields must be required"
                })
            }

            const payload = createAddonTypeSchema.safeParse(inputData)

            if(!payload.success){
                return res.status(400).json({
                    msg:payload.error.errors[0].message
                })
            }

            const { item, quantity} = payload.data

            const addonData:AddonInputType = {
                item:{
                    name:item.name,
                    amount:item.amount,
                    currency: item.currency,
                    description: item.description || ""
                  },
                  quantity
            }

            const addon = await rzp.subscriptions.createAddon(sub_id,addonData)

            if(!addon){
                return res.status(500).json({
                    msg:"Failed to create addon"
                })
            }

            return res.status(200).json({
                addon,
                msg:"Addon created successfully"
            })

        } catch (error) {
            return res.status(500).json({
                msg:"Internal server error"
            })
        }
    }

    // get all addons
    static async allAddons( req:Request, res:Response):Promise<any>{
        try {
            const user =  req.user

            const addons = await rzp.addons.all()

            if(!addons || addons.items.length  === 0){
                return res.status(500).json({
                    msg:"addon not found"
                })
            }

            return res.status(200).json({
                addons,
                msg:"Addon fetched successfully"
            })

        } catch (error) {
            return res.status(500).json({
                msg:"Internal server error"
            })
        }
    }

    // get single addon 
    static async getAddon( req:Request, res:Response):Promise<any>{
        try {
            const user =  req.user
            const addonId:string =  req.params.addonId

            const addon = await rzp.addons.fetch(addonId)

            if(!addon){
                return res.status(500).json({
                    msg:"addon not found"
                })
            }

            return res.status(200).json({
                addon,
                msg:"Addon fetched successfully"
            })

        } catch (error:any) {
            return res.status(500).json({
                msg:error.error.description || "Internal server error"
            })
        }
    }

    // delete addon 
    static async deleteAddon( req:Request, res:Response):Promise<any>{
        try {
            const user =  req.user
            const addonId:string =  req.params.addonId

            const addon = await rzp.addons.fetch(addonId)

            if(!addon){
                return res.status(400).json({
                    msg:"addon not found , bad request"
                })
            }

            await rzp.addons.delete(addonId)

            return res.status(200).json({
                msg:"Addon deleted successfully"
            })

        } catch (error:any) {
            return res.status(500).json({
                msg:error.error.description || "Internal server error"
            })
        }
    }


}


export default Addon