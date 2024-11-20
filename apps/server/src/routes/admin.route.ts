import { Router } from "express";
import { requireAdmin } from "../middleware/admin.middleware.js";
import mainController from "../controllers/admin.controller.js";
import planRouter from "../routes/plan.route.js";
const router:Router = Router()

router.route('/').get(requireAdmin , mainController)

router.use('/plans' ,planRouter )

export default router