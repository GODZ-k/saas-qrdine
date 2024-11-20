import { Router } from "express";
import Plan from "../controllers/plan.controller.js";

const router:Router = Router()

router.route('/').post(Plan.createPlan)
router.route('/').get(Plan.plans)
router.route('/:planId').get(Plan.plan)

export default router