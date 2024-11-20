import { Router } from "express";
import User from "../controllers/user.controller.js";
import Addon from "../controllers/addons.controller.js";
const router:Router = Router()

// addons routes 

router.route('/:sub_id/create').post(Addon.createAddon)
router.route('/').get(Addon.allAddons) 
router.route('/:addonId').get(Addon.getAddon) 
router.route('/:addonId').delete(Addon.deleteAddon) 


export default router