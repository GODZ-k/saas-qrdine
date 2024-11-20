import { z, ZodType } from "zod";

export interface AddonInputType {
    item:{
        name:string;
        amount:number;
        currency:string;
        description?:string
    },
    quantity:number
}


const createAddonTypeSchema:ZodType<AddonInputType> = z.object({
    item:z.object({
        name:z.string(),
        amount:z.number(),
        currency:z.string(),
        description:z.string().optional()
    }),
    quantity:z.number()
})


export {
    createAddonTypeSchema
}