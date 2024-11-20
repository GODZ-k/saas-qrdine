import crypro from 'crypto'
import { NextFunction, Request, Response } from "express";
import { RAZORPAY_WEBHOOK_SECRET } from "../config/config.js";


export const verifyRazorpayWebhook = async (req: Request, res: Response , next:NextFunction):Promise<any> => {

    try {
        if (!RAZORPAY_WEBHOOK_SECRET) {
            throw new Error('You need a WEBHOOK_SECRET in your .env');
          }
    
          // Get the headers and body
          const headerPayload = req.headers;
          const payload = req.body;
    
          // Get the Svix headers for verification
          const razorpay_signature = headerPayload['x-razorpay-signature'];
    
          const body = JSON.stringify(payload);

          // Attempt to verify the incoming webhook
          // If successful, the payload will be available from 'evt'
          // If the verification fails, error out and return error code
          try {
            const expected_signature = crypro.createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
            expected_signature.update(body)
            const digest = expected_signature.digest('hex')

            // console.log("expected",digest,"razorpay", razorpay_signature)
    
            if (digest !== razorpay_signature) {
              return res.status(400).json({
                msg: "Forbidden"
              });
            }
            req.event  = payload
    
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
