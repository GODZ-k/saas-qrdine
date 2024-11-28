"use server";
import { CreatePasskeyButton } from "@/components/CustomCreatePasskeysButton";
import { DeletePasskeyUI } from "@/components/DeletePasskeyUI";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import React from "react";

async function fetchData(token: string) {
  const res = await axios.get("http://localhost:8080/api/v1/user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res?.data?.loggedInUser;
}

export default async function Page() {
  const { getToken } = await auth();
  const token = await getToken();
  // Fetch user data on the server side

  const data = await fetchData(token as string)

  return (
    <div>
      <h1>Welcome, {data?.firstName || "User"}!</h1>
      <p>Email: {data?.emailAddress || "No email provided"}</p>
      {data?.role === "USER" && !data.isSubscribed ? (
        <>
          <div>You haven't subscribed yet. Please buy a subscription</div>
          <Link href={"/subscription/buy"}>
            <Button>Buy a subscription</Button>
          </Link>
        </>
      ) : (
        <div>
          <div>Your subscription details</div>
          {data?.subscription.map(
            (subscription) =>
              (subscription.status === "active" || subscription.status === "created") && (
                <div key={subscription.id} className=" py-3 px-6 space-y-3">
                  <div>
                    <ul className=" space-y-3">
                      <li className=" flex gap-3 items-center">
                        subscription status :{" "}
                        <div className=" bg-green-200 text-sm text-green-500 rounded-md w-fit px-2">
                          {subscription.status}
                        </div>
                      </li>
                      <li className=" flex gap-3 items-center">
                        subscription quantity :{" "}
                        <div className=" text-gray-400">
                          {subscription.quantity}
                        </div>
                      </li>
                      <li className=" flex gap-3 items-center">
                        payment method : <div>{subscription.paymentMethod}</div>
                      </li>
                      <li className=" flex gap-3 items-center">
                        Next due : <div></div>
                        {moment
                          .unix(subscription.chargeAt)
                          .format("DD MMMM YYYY")}
                      </li>
                      <li className=" flex gap-3 items-center">
                        Started at :{" "}
                        <div>
                          {moment
                            .unix(subscription.startAt)
                            .format("DD MMMM YYYY")}
                        </div>
                      </li>
                      <li className=" flex gap-3 items-center">
                        end at :{" "}
                        <div className=" bg-red-200 text-sm text-red-500 rounded-md w-fit px-2">
                          {moment
                            .unix(subscription.endAt)
                            .format("DD MMMM YYYY")}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                  {subscription.status !== "active" ? (
                    <Link href={subscription?.shortUrl || ""}>
                      <Button className=" bg-red-500 text-white hover:bg-red-600">
                        Continue with payment
                      </Button>
                    </Link>
                  ) : (
                    <Link href={"/user/subscription"}>
                      <Button>Manage your subscription</Button>
                    </Link>
                  )}
                  </div>
                </div>
              ))
          }
        </div>
      )}
      {/* Display additional user information if needed */}
                  <CreatePasskeyButton/>
                  <DeletePasskeyUI/>
    </div>
  );
}
