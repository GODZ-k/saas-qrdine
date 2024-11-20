import { z, ZodType } from "zod";


export interface demoData {
    email:string;
    phone:string;
    message:string;
    firstName:string;
    lastName?:string;
    preferedTime?:string;

}

export const demoType:ZodType<demoData> = z.object({
    firstName:z.string().max(20),
    lastName:z.string().max(20).optional(),
    email:z.string().email(),
    phone:z.string().length(10),
    message:z.string().max(200),
    preferedTime:z.string().optional()

})