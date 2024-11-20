import { Router } from "express";
import demoController from "../controllers/main.controller.js";
const router:Router = Router()

router.route('/request-demo').post(demoController)

export default router