import { Request, Response } from "express";
import { rzp } from "../services/rezorpay.js";
import { CreatePlanType, CreatePlanTypeSchema } from "../Types/Plans.types.js";
import prisma from "../config/db.config.js";

class Plan {
    
  static async createPlan(req: Request, res: Response): Promise<any> {
    try {
      // const user = req.user
      const inputData: CreatePlanType = req.body;

      if (!inputData) {
        return res.status(400).json({
          msg: "All fields must be required",
        });
      }

      const payload = CreatePlanTypeSchema.safeParse(inputData);

      if (!payload.success) {
        return res.status(400).json({
          msg: payload.error.errors[0].message,
        });
      }

      const { period, interval, item, notes } = payload.data;

      const planDetails: CreatePlanType = {
        period,
        interval,
        item: {
          name: item.name,
          amount: item.amount,
          currency: item.currency,
          description: item.description || "",
        },
        notes: notes || {},
      };

      const plan = await rzp.plans.create(planDetails);

      const createdPlan = await prisma.plan.create({
        data: {
          id: plan.id,
          amount:Number(plan.item.amount),
          name:plan.item.name.toUpperCase(),
          currency:plan.item.currency.toUpperCase(),
          interval:Number(plan.interval),
          period:plan.period,
          description:plan.item.description,
          hsnCode: plan.item.hsn_code || "",
          sacCode:plan.item.sac_code || "",
          taxInclusive:plan.item.tax_inclusive,
        },
      });

      if(!createdPlan){
        return res.status(500).json({
            msg:"Failed to create plan"
        })
      }

      return res.status(200).json({
        createdPlan,
        msg: "Plan created successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: error.error.description ||"Internal server error",
      });
    }
  }

  static async plans(req:Request, res:Response):Promise<any> {
    try{
        const user = req.user

        const plans = await prisma.plan.findMany({ where:{
          isActive:true
        }})

        if(!plans || plans.length === 0){
            return res.status(404).json({
                msg:"Plans not found"
            })
        }

        return res.status(200).json({
            plans,
            msg:"plans found successfully"
        })

    }catch(error:any){
        console.log(error);
        return res.status(500).json({
          msg: "Internal server error",
        });
    }
  }

  static async plan(req:Request, res:Response):Promise<any> {
    try{
        const user = req.user
        const planId:string = req.params.planId

        const plan = await rzp.plans.fetch(planId)

        if(!plan){
            return res.status(404).json({
                msg:"Plans not found"
            })
        }

        return res.status(200).json({
            plan,
            msg:"plans found successfully"
        })

    }catch(error:any){
        console.log(error);
        return res.status(500).json({
          msg: "Internal server error",
        });
    }
  }

}

export default Plan;
