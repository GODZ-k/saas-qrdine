import { WebhookEvent } from "@clerk/express";
import {Webhook} from "svix";
import { NextFunction, Request, Response } from "express";

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET as string;


export const verifyClerkWebhook = async (req: Request, res: Response , next:NextFunction):Promise<any> => {

    try {
        if (!WEBHOOK_SECRET) {
            throw new Error('You need a WEBHOOK_SECRET in your .env');
          }
    
          // Get the headers and body
          const headerPayload = req.headers;
          const payload = req.body;

    
          // Get the Svix headers for verification
          const svix_id = headerPayload['svix-id'];
          const svix_timestamp = headerPayload['svix-timestamp'];
          const svix_signature = headerPayload['svix-signature'];
    
          const body = JSON.stringify(payload);
    
          // If there are no Svix headers, error out
          if (!svix_id || !svix_timestamp || !svix_signature) {
            return res.status(400).json({
              msg: "Forbidden"
            });
          }
    
          // Create a new Svix instance with your secret.
          const wh = new Webhook(WEBHOOK_SECRET);
    
          console.log(wh)
    
          // Attempt to verify the incoming webhook
          // If successful, the payload will be available from 'evt'
          // If the verification fails, error out and return error code
          try {
            let evt: WebhookEvent=  await wh.verify(body, {
              "svix-id": svix_id as string,
              "svix-signature": svix_signature as string,
              "svix-timestamp": svix_timestamp as string
            }) as WebhookEvent;

            req.event  = evt
    
            next()

          } catch (err: any) {
            console.log('Error verifying webhook:', err.message);
            return res.status(400).json({
              success: false,
              message: err.message,
            });
          }
    
        
    
    } catch (error) {
     
        return res.status(500).json({
            msg:"Internal server error"
        })
    }
      
  };
