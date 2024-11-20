import { z, ZodType } from "zod";

interface CreatePlanItemType {
    name: string;
    amount: number;
    currency: string;
    description?: string;
}

interface IMap<T> {
    [key: string]: T | null;
}

export enum PlanPeriodType {
  weekly="weekly",
  daily="daily",
  monthly="monthly",
  yearly="yearly"
}
export interface CreatePlanType{
  period: PlanPeriodType;
  interval: number;
  item: CreatePlanItemType;
  notes?: IMap<string | number>
}


export const CreatePlanTypeSchema:ZodType<CreatePlanType> = z.object({
  period: z.enum([PlanPeriodType.daily,PlanPeriodType.monthly,PlanPeriodType.weekly, PlanPeriodType.yearly]),
  interval: z.number(),
  item:z.object({
    name: z.string(),
    amount: z.number(),
    currency: z.string(),
    description: z.string().optional()
  }),
  notes:z.record(z.union([z.string(), z.number()])).optional()
})