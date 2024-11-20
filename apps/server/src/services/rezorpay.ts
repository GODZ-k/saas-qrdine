import Razorpay from 'razorpay'
import { RAZORPAY_API_ID, RAZORPAY_API_SECRET } from '../config/config.js'


export const rzp = new Razorpay({ key_id: RAZORPAY_API_ID, key_secret: RAZORPAY_API_SECRET , })