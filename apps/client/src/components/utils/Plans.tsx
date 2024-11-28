"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

async function createSubscription({ subscriptionData, token }:{subscriptionData:object , token:string}) {
  try {
    console.log(subscriptionData, token);
    const response = await axios.post(
      "http://localhost:8080/api/v1/user/subscriptions",
      subscriptionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await response.data;
  } catch (error) {
    console.log(error);
  }
}

async function planData() {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/admin/plans"
    );
    const data = response.data;
    
    return data;
  } catch (error: any) {
    console.log(error);
  }
}

function Plans() {
  const { getToken, isLoaded } = useAuth();
  const router = useRouter();
  const skeletonLength = 5;
  const skeletonArray = new Array(skeletonLength).fill(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const mutation = useMutation({ mutationFn: createSubscription , onSuccess:(data)=>{ if(data.subscription.short_url){  
        setIsRedirecting(true)
        setTimeout(() => {
            router.push(data.subscription.short_url);
          }, 1000);
  }} });

  const { data = {}, isFetched, error, isError } = useQuery({
    queryKey: ["planData"],
    queryFn: planData,
    refetchInterval: 5000,
    
  });

  if (!isLoaded) {
    // Handle loading state however you like
    return <div>Loading...</div>;
  }

  async function handleBuySubscription(planId: string) {
    try {
      const subscriptionData = {
        plan_id: planId,
        total_count: 10,
        quantity: 1,
      };

      const token: string | null = await getToken();

      const requestData = { subscriptionData, token };

     await mutation.mutateAsync(requestData);

    } catch (error: any) {
      console.log(error);
    }
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (mutation.isPending) {
    return <div>Loading ... </div>;
  }

  if (isRedirecting) {
    return <div className="text-center text-lg font-semibold">Redirecting...</div>;
  }

  return (
    <div className=" space-y-4  w-96">
      {isFetched
        ? data?.plans?.length > 0 ?
          data?.plans?.map((plan) => (
            <div key={plan.id} className=" space-y-5">
              <Card
                onClick={() => handleBuySubscription(plan.id)}
                className=" flex justify-between items-center p-3"
              >
                <div className=" text-xl text-yellow-500">{plan.name}</div>
                <div className=" text-gray-500 flex gap-2 items-center">
                  <div>
                    {plan.amount}/{plan.period}
                  </div>
                  <Button>Buy</Button>
                </div>
              </Card>
            </div>
          )) : "No plan found"
        : skeletonArray.map((_, index) => (
            <div key={index} className=" space-y-5">
              <Skeleton className=" h-[70px] flex justify-between items-center p-3 rounded-xl">
                <Skeleton className=" w-12 h-12 rounded-full" />
                <Skeleton className=" w-16 h-7 rounded-xl" />
              </Skeleton>
            </div>
          ))}
    </div>
  );
}

export default Plans;
