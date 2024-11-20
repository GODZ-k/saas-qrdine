import 'dotenv/config'
import express   from 'express'
import cookieParser from 'cookie-parser'
import { clerkMiddleware} from '@clerk/express'
import cors from 'cors'
import mainRoute from './routes/main.route.js'
import userRoute from './routes/user.route.js'
import adminRoute from './routes/admin.route.js'
import staffRoute from './routes/staff.route.js'
import addonRoute from './routes/addon.route.js'
import webhookroute from './routes/webhook.route.js'
import bodyParser from 'body-parser'
import './webhooks/workers/auth.worker.js'; // This imports and runs the worker
import './webhooks/workers/subscription.worker.js'
import './webhooks/workers/payment.worker.js'
import './webhooks/workers/order.worker.js'

const app = express()

app.use(clerkMiddleware({
    debug:true
}))
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))
app.use(express.json({ limit:"100mb"}))
app.use(bodyParser.raw({ type: 'application/json' }),)
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())


app.use('/api/v1' , mainRoute )
app.use('/api/webhook' , webhookroute)
app.use('/api/v1/user' , userRoute )
app.use('/api/v1/addons' , addonRoute )
app.use('/api/v1/admin' , adminRoute )
app.use('/api/v1/staff' , staffRoute )


export default app