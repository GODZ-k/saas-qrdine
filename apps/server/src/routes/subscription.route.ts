import { Router } from "express";
import Subscription from "../controllers/subscription.controller.js";
import Addon from "../controllers/addons.controller.js";
import { requireUser } from "../middleware/user.middleware.js";
const router:Router = Router()

router.route('/').post(requireUser,Subscription.create)
router.route('/:sub_id').get(Subscription.getById)
router.route('/').get(Subscription.getAll)
router.route('/:sub_id/cancel').post(Subscription.cancel)
router.route('/:sub_id/cancel-updates').post(Subscription.cancelUpdates)
router.route('/:sub_id/pause').post(Subscription.pause)
router.route('/:sub_id/resume').post(Subscription.resume)
router.route('/:sub_id/:off_id').delete(Subscription.delOffer)
router.route('/invoices/:sub_id').get(Subscription.invoices)


// addons routes 

router.route('/:sub_id/addons').post(Addon.createAddon)
router.route('/addons').get(Addon.allAddons) 
router.route('/addons/:addonId').get(Addon.getAddon) 
router.route('/addons/:addonId').delete(Addon.deleteAddon) 


export default router