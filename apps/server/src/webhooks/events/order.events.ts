import prisma from "../../config/db.config.js";

async function OrderPaid(data: any) {
    try {
      console.log("order paid is working");

      await prisma.$transaction(async (prisma) => {
          await prisma.order.update({
            where:{
                id:data.order.entity.id
            },
            data: {
                status: data.order.entity.status,
                currency: data.order.entity.currency,
                attempts: Number(data.order.entity.attempts),
                amount:Number(data.order.entity.amount),
                amountPaid:Number(data.order.entity.amount_paid),
                
            },
          });
      });
  
      return

    } catch (error) {
      console.log(error);
      return;
    }
}


export {
    OrderPaid
}