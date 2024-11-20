import { Job, Worker } from "bullmq";
import {
  SubscriptionActivated,
  SubscriptionAuthenticated,
  SubscriptionCancelled,
  SubscriptionCharged,
  SubscriptionCompleted,
  SubscriptionHalted,
  SubscriptionPaused,
  SubscriptionPending,
  SubscriptionResumed,
  SubscriptionUpdated,
} from "../events/subscription.event.js";
import logger from "../../logger.js";
import { client } from "../../services/redis.js";
import { queue } from "../../utils/jobs.js";

export const worker = new Worker(
  queue.subscription,
  async (job: Job) => {
    try {
      const { eventType, data } = job.data;

      console.log(eventType, data);

      switch (eventType) {
        case "subscription.authenticated":
          await SubscriptionAuthenticated(data);
          break;
        case "subscription.activated":
          await SubscriptionActivated(data);
          break;

        case "subscription.charged":
          await SubscriptionCharged(data);
          break;

        case "subscription.completed":
          await SubscriptionCompleted(data);
          break;

        case "subscription.updated":
          await SubscriptionUpdated(data);
          break;

        case "subscription.pending":
          await SubscriptionPending(data);
          break;

        case "subscription.halted":
          await SubscriptionHalted(data);
          break;

        case "subscription.cancelled":
          await SubscriptionCancelled(data);
          break;

        case "subscription.paused":
          await SubscriptionPaused(data);
          break;

        case "subscription.resumed":
          await SubscriptionResumed(data);
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
