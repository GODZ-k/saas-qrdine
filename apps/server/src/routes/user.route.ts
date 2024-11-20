import { Router } from "express";
import { requireUser } from "../middleware/user.middleware.js";
import User from "../controllers/user.controller.js";
import subscriptionRoute from './subscription.route.js'
const router:Router = Router()

router.route('/profile').get(requireUser,User.currentUser)



// bypass subscription addons routes 

router.use('/subscriptions', subscriptionRoute)

export default router