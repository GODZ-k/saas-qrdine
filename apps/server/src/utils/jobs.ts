import { Queue } from "bullmq";
import { client } from "../services/redis.js";

const queue = {
    auth:'auth-queue',
    subscription:'subscription-queue',
    payment:'payment-queue',
    order:'order-queue'
}


const authQueue = new Queue(queue.auth,{
  connection:client
});


const subscriptionQueue = new Queue(queue.subscription,{
    connection:client
});
    
const paymentQueue = new Queue(queue.payment,{
    connection:client
});

const orderQueue = new Queue(queue.order,{
    connection:client
})
    
export {
    authQueue,
    subscriptionQueue,
    queue,
    paymentQueue,
    orderQueue
}