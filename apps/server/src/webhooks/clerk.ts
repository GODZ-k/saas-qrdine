import { Request, Response } from "express";
import { WebhookEvent } from "@clerk/express";
import logger from "../logger.js";
import { authQueue } from "../utils/jobs.js";

interface ExternalAccount {
  id: string;
  created_at: number;
  email_address: string;
  google_id?: string;
  updated_at: number;
  username: string;
  verification: { status: string; strategy: string; expire_at: number };
  approved_scopes: string;
  avatar_url?: string;
  first_name?: string;
  identification_id?: string;
  last_name?: string;
  provider?: string;
  provider_user_id?: string;
}

interface EmailAddress {
  created_at?: number;
  email_address?: string;
  id?: string;
  updated_at?: number;
  verification?: { status: string; strategy: string };
}

interface PhoneNumber {
  id: string;
  phone_number: string;
  verification?: { status: string; strategy: string };
}

export interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  email_addresses?: Array<EmailAddress> | undefined;
  external_accounts?: Array<ExternalAccount>;
  banned?: boolean;
  backup_code_enabled?: boolean;
  image_url?: string;
  last_active_at?: number;
  last_sign_in_at?: number;
  locked?: boolean;
  updated_at?: number;
  two_factor_enabled?: boolean;
  username?: string;
  phone_numbers?: Array<PhoneNumber>;
  created_at?: number;
}

export const clerkWebhook = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const evt = req.event as WebhookEvent;

    if (!evt) {
      return res.status(400).json({
        success: false,
        message: "Webhook event not found or not verified.",
      });
    }

    const data = evt.data;
    const eventType = evt.type;

    // const eventHandlers: Record<string, Function> = {
    //   "user.created": UserCreated,
    //   "user.updated": UserUpdated,
    //   "user.deleted": UserDeleted,
    // };

    // const handler = eventHandlers[eventType];
    // await handler(data);
    await authQueue.add(
      eventType,
      { eventType, data },
      {
        attempts: 5, // Retry the job up to 5 times
        backoff: 5000, // Retry after 5 seconds if the job fails
        delay: 1000,
        // removeOnComplete:{
        //   age:3600,
        //   count:1000
        // },
        // removeOnFail:{
        //   age:24*3600
        // }
        removeOnComplete: true,
        removeOnFail: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Webhook received successfully",
    });
  } catch (error: any) {
    logger.error("Error handling webhook event", {
      error: error.message,
      stack: error.stack,
    });
    return res.status(500).json({
      status: false,
      msg: "Internal server error",
      error: error.message,
    });
  }
};

// // Type guard function
// function isUserData(data: any): data is UserData {
//   return (
//     data &&
//     typeof data.id === "string" &&
//     Array.isArray(data.email_addresses) &&
//     Array.isArray(data.external_accounts) &&
//     Array.isArray(data.phone_numbers)
//   );
// }
