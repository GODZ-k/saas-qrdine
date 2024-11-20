import {Redis} from "ioredis";
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "../config/config.js";

export const client = new Redis({
    port:REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD,
    maxRetriesPerRequest:null,
    db:0
})

client.on('connect', () => {
    console.log(`Connected to Redis successfully!`);
});

client.on('error', (err:any) => {
    console.error('Redis connection error:', err);
});
