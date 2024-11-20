import { Job, Worker } from "bullmq";
import { UserCreated, UserUpdated, UserDeleted } from "../events/user.events.js";
import logger from "../../logger.js";
import { client } from "../../services/redis.js";
import { queue } from "../../utils/jobs.js";

export const worker = new Worker(queue.auth, async (job:Job) => {
      try {
        const { eventType, data } = job.data;

        // console.log(`Processing job for event: ${eventType}`);

        // Process the event based on its type
        switch (eventType) {
          case "user.created":
            await UserCreated(data);
            break;
          case "user.updated":
            await UserUpdated(data);
            break;
          case "user.deleted":
            await UserDeleted(data);
            break;
          default:
            logger.warn(`Unhandled event type: ${eventType}`);
        }
      } catch (error: any) {
        logger.error("Error processing job", {
          error: error.message,
          stack: error.stack,
        });
        throw error; // BullMQ will automatically retry the job based on queue settings
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
    worker.on("completed", (job:Job) => {
      console.info(`Job completed: ${job.id}`);
    });
  
    worker.on("failed", (job: Job | undefined, err: Error, prev:string) => {
      console.error(`Job failed: ${job?.id}, ${err.message } previous status was ${prev}` );
    });
  
    worker.on("active", (job: Job, prev: string) => {
      console.log(`Job ${job.id} is now active; previous status was ${prev}`);
    });

  worker.on('progress', (job:Job , progress:number | object) => {
    console.log(`${job.id} reported progress ${progress}`);
  });

