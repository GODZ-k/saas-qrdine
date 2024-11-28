"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation} from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import Plans from "@/components/utils/Plans";


async function createPlan(data:any){
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/admin/plans", // Your API endpoint for creating plans
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create plan");
  }
}

function Dashboard() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm();


  const {mutateAsync ,isPending  } = useMutation({ mutationFn: createPlan  })


  async function handleCreatePlan(formData: any) {
    const transformedData = {
      period: formData.period,
      interval: parseInt(formData.interval, 10),
      item: {
        name: formData.name,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
      },
    };
    await mutateAsync(transformedData)
    
    reset()
  }



  return (
    <>
      <div className=" px-2 font-semibold text-xl">create plan</div>
      <div className=" grid grid-cols-2">
        <div className="  w-96 m-10">
          <form
            className=" space-y-2"
            action=""
            onSubmit={handleSubmit(handleCreatePlan)}
          >
            <div className=" space-y-2">
              <Label>period</Label>
              <Input
                type="text"
                placeholder="Plan period"
                {...register("period", {
                  required: "Plan period must be require",
                })}
              />
            </div>
            <div className=" space-y-2">
              <Label>Interval</Label>
              <Input
                type="number"
                placeholder="Plan interval"
                {...register("interval", {
                  required: "interval must be require",
                })}
              />
            </div>
            <div className=" space-y-2">
              <Label>Name</Label>
              <Input
                type="text"
                placeholder="Plan name"
                {...register("name", {
                  required: "Plan name must be require",
                })}
              />
            </div>
            <div className=" space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="Plan amount"
                {...register("amount", {
                  required: "Plan amount must be require",
                })}
              />
            </div>
            <div className=" space-y-2">
              <Label>Currency</Label>
              <Input
                type="text"
                placeholder="Plan period"
                {...register("currency", {
                  required: "Plan currency must be require",
                })}
              />
            </div>
            <div className=" space-y-2">
              <Button type="submit">{isPending ? "loading.." : "Submit"}</Button>
            </div>
          </form>
        </div>

        {/* all plans */}
      <Plans/>
      </div>
    </>
  );
}

export default Dashboard;
