import { Router } from "express";
import { requireStaff } from "../middleware/staff.middleware.js";
import mainController from "../controllers/staff.controller.js";
const router:Router = Router()

router.route('/').get(requireStaff , mainController)

export default router