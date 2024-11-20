import { WebhookEvent } from '@clerk/express';
import { Request} from 'express'

declare global {
    namespace Express {
        interface Request {
            user?:string;
            event?:{
                payload?:object;
                event?:event
                data?:object
            };
        }
    }

}


