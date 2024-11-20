import { RAZORPAY_API_BASE_URL } from "../config/config"

const V1 = 'v1'

export const planApi = {
    createPlan:`${RAZORPAY_API_BASE_URL}/${V1}/plans`
}