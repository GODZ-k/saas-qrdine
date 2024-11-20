import { Router } from "express";
import { clerkWebhook } from "../webhooks/clerk.js";
import { verifyClerkWebhook } from "../middleware/clerk.webhook.middleware.js";
import { verifyRazorpayWebhook } from "../middleware/razorpay.webhook.js";
import { rezorpayWebhook } from "../webhooks/rezorpay.js";
const router:Router = Router()

router.route('/clerk').post(verifyClerkWebhook ,clerkWebhook)
router.route('/razorpay').post(verifyRazorpayWebhook ,rezorpayWebhook)

export default router