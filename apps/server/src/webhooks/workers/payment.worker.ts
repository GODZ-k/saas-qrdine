import { Job, Worker } from "bullmq";
import logger from "../../logger.js";
import { client } from "../../services/redis.js";
import { queue } from "../../utils/jobs.js";
import {
  CreateRefund,
  FailRefund,
  PaymentAuthorized,
  PaymentCaptured,
  PaymentFailed,
  ProceedRefund,
  SpeedRefund,
} from "../events/payment.events.js";

export const worker = new Worker(
  queue.payment,
  async (job: Job) => {
    try {
      const { eventType, data } = job.data;

      console.log(eventType, data);

      switch (eventType) {
        case "payment.authorized":
          await PaymentAuthorized(data);
          break;
        case "payment.captured":
          await PaymentCaptured(data);
          break;
        case "payment.failed":
            await PaymentFailed(data)
            break;
        case "refund.created":
          await CreateRefund(data)
          break;
        case "refund.speed_changed":
          await SpeedRefund(data)
          break;
        case "refund.processed":
          await ProceedRefund(data)
          break;
        case "refund.failed":
          await FailRefund(data)
          break;
        default:
          logger.warn(`Unhandled event type: ${eventType}`);
      }
    } catch (error: any) {
      logger.error("Error processing job", {
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  },
  {
    connection: client,
    limiter: {
      max: 1,
      duration: 1000,
    },
  }
);

// Monitor worker events (completed, failed)
worker.on("completed", (job: Job) => {
  console.info(`Job completed: ${job.id}`);
});

worker.on("failed", (job: Job | undefined, err: Error, prev: string) => {
  console.error(
    `Job failed: ${job?.id}, ${err.message} previous status was ${prev}`
  );
});

worker.on("active", (job: Job, prev: string) => {
  console.log(`Job ${job.id} is now active; previous status was ${prev}`);
});

worker.on("progress", (job: Job, progress: number | object) => {
  console.log(`${job.id} reported progress ${progress}`);
});
