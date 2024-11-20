import { Request, Response } from "express";
import logger from "../logger.js";
import { orderQueue, paymentQueue, subscriptionQueue } from "../utils/jobs.js";

export const rezorpayWebhook = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const request = req.event;

    if (!request) {
      return res.status(400).json({
        success: false,
        message: "Webhook event not found or not verified.",
      });
    }

    const data = request.payload;
    const eventType:string = request.event;

    if(eventType.startsWith('payment')){
      await paymentQueue.add(
        eventType,
        { eventType, data },
        {
          attempts: 5, // Retry the job up to 5 times
          backoff: 5000, // Retry after 5 seconds if the job fails
          delay: 1000,
          removeOnComplete:true,
          removeOnFail:true
        }
      );
    }else if(eventType.startsWith('subscription')){
      await subscriptionQueue.add(
        eventType,
        { eventType, data },
        {
          attempts: 5, // Retry the job up to 5 times
          backoff: 5000, // Retry after 5 seconds if the job fails
          delay: 1000,
          removeOnComplete:true,
          removeOnFail:true
        }
      );
    }else if(eventType.startsWith('order')){
      await orderQueue.add(
        eventType,
        { eventType, data },
        {
          attempts: 5, // Retry the job up to 5 times
          backoff: 5000, // Retry after 5 seconds if the job fails
          delay: 1000,
          removeOnComplete:true,
          removeOnFail:true
        }
      );
    }else if (eventType.startsWith('refund')){
      await paymentQueue.add(
        eventType,{eventType,data},
        {
          attempts:5,
          backoff:500,
          delay:100,
          removeOnComplete:true,
          removeOnFail:true
        }
      )
    }

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
