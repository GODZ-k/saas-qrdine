import prisma from "../../config/db.config.js";

async function PaymentAuthorized(data: any) {
  try {

    await prisma.$transaction(async (prisma) => {

      const payment = await prisma.payment.create({
        data: {
          id: data.payment.entity.id,
          amount: data.payment.entity.amount,
          cusId: data.payment.entity.customer_id || "",
          orderId: data.payment.entity.order_id,
          invoice: data.payment.entity.invoice_id,
          currency: data.payment.entity.currency,
          status: data.payment.entity.status,
          paymentMethod: data.payment.entity.method,
          bank: data.payment.entity.bank,
          vpa: data.payment.entity.vpa,
          bankTransitionId:
            data.payment.entity.method === "netbanking"
              ? data.payment.entity.acquirer_data.bank_transaction_id
              : "",
          amountRefunded: Number(data.payment.entity.amount_refunded),
          refundStatus: data.payment.entity.refund_status || "",
          captured: data.payment.entity.captured,
          fee: data.payment.entity.fee,
          tokenId: data.payment.entity.token_id,
          errorCode: data.payment.entity.error_code,
          wallet: data.payment.entity.wallet,
          subscriptionId: null,
          acquirerTransitionId:
            data.payment.entity.method === "wallet"
              ? data.payment.entity.acquirer_data.transaction_id
              : "",
          email: data.payment.entity.email,
          contact: data.payment.entity.contact,
          cardName: data.payment.entity.card.name,
          last4: Number(data.payment.entity.card.last4),
          network: data.payment.entity.card.network,
          cardType: data.payment.entity.card.type,
          cardId: data.payment.entity.card_id,
          createdAt: new Date(data.payment.entity.created_at),
        },
      });

      await prisma.order.create({
        data: {
          id: data.payment.entity.order_id,
          paymentId:payment.id,
          currency: data.payment.entity.currency,
          amount: Number(data.payment.entity.amount),
          amountPaid: Number(data.payment.entity.amount),
        },
      });

      await prisma.subscriptionCharge.create({
        data: {
          amount: Number(data.payment.entity.amount),
          orderId: data.payment.entity.order_id,
          invoiceId: data.payment.entity.invoice_id,
          paymentId: data.payment.entity.id,
          status: "initiated",
          chargeAt: new Date(),
        },
      });
    });

    return;
  } catch (error) {
    console.log(error);
    return;
  }
}

async function PaymentCaptured(data: any) {
  try {

    await prisma.$transaction(async (prisma) => {
      await prisma.payment.update({
        where: {
          id: data.payment.entity.id,
        },
        data: {
          status: data.payment.entity.status,
          captured: data.payment.entity.captured,
          fee: data.payment.entity.fee,
        },
      });

      await prisma.order.update({
        where: {
          id: data.payment.entity.order_id,
        },
        data: {
          status: "paid",
        },
      });
  
      await prisma.subscriptionCharge.update({
        where:{
          paymentId:data.payment.entity.id
        },
        data: {
          status: "paid",
        },
      });
    });

   

    return;
  } catch (error) {
    console.log(error);
    return;
  }
}

async function PaymentFailed(data: any) {
  try {

    await prisma.$transaction(async (prisma) => {
      await prisma.payment.update({
        where: {
          id: data.payment.entity.id,
        },
        data: {
          status: data.payment.entity.status,
          captured: data.payment.entity.captured,
          fee: data.payment.entity.fee,
          errorCode: data.payment.entity.error_reason,
        },
      });

      await prisma.order.update({
        where: {
          id: data.payment.entity.order_id,
        },
        data: {
          status: "failed",
          amountPaid: 0,
        },
      });

      await prisma.subscriptionCharge.update({
        where: {
          paymentId: data.payment.entity.id,
        },
        data: {
          status: "failed",
        },
      });
    });

    return;
  } catch (error) {
    console.log(error);
    return;
  }
}

async function CreateRefund(data: any) {
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.refund.create({
        data: {
          id:data.refund.entity.id,
          status: data.refund.entity.status,
          amount: Number(data.refund.entity.amount),
          currency: data.refund.entity.currency,
          paymentId:data.payment.entity.id,
          referenceNo:data.refund.entity.acquirer_data?.rrn || data.refund.entity.acquirer_data?.arn,
          speed:data.refund.entity.speed_processed

        },
      });

      await prisma.payment.update({
        where: {
          id: data.payment.entity.id,
        },
        data: {
          status: data.payment.entity.status,
          refundStatus:data.payment.entity.refund_status,
          amountRefunded:Number(data.payment.entity.amount_refunded),
          
        },
      });
    });

    return;
  } catch (error) {
    console.log(error);
    return;
  }
}

async function ProceedRefund(data: any) {
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.refund.update({
        where:{
          id:data.refund.entity.id
        },
        data: {
          status: data.refund.entity.status,
          referenceNo:data.refund.entity.acquirer_data?.rrn || data.refund.entity.acquirer_data?.arn,
          speed:data.refund.entity.speed_processed
        },
      });

      await prisma.payment.update({
        where: {
          id: data.payment.entity.id,
        },
        data: {
          status: data.payment.entity.refund_status === 'partial' ? "refunded" : data.payment.entity.status,
          refundStatus:data.payment.entity.refund_status,
          refunded:true
        },
      });
    });

    return;
  } catch (error) {
    console.log(error);
    return;
  }
}

async function SpeedRefund(data: any) {
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.refund.update({
        where:{
          id:data.refund.entity.id
        },
        data: {
          status: data.refund.entity.status,
          speed:data.refund.entity.speed_processed
        },
      });

      await prisma.payment.update({
        where: {
          id: data.payment.entity.id,
        },
        data: {
          status: data.payment.entity.refund_status === 'partial' ? "refunded" : data.payment.entity.status,
          refundStatus:data.payment.entity.refund_status,
          refunded:true
        },
      });
    });

    return;
  } catch (error) {
    console.log(error);
    return;
  }
}

async function FailRefund(data: any) {
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.refund.update({
        where:{
          id:data.refund.entity.id
        },
        data: {
          status: data.refund.entity.status,
          referenceNo:data.refund.entity.acquirer_data?.rrn || data.refund.entity.acquirer_data?.arn,
          speed:data.refund.entity.speed_processed
        },
      });

      await prisma.payment.update({
        where: {
          id: data.payment.entity.id,
        },
        data: {
          status: data.payment.entity.status,
          refundStatus:data.payment.entity.refund_status,
          refunded:false,
          
        },
      });
    });

    return;
  } catch (error) {
    console.log(error);
    return;
  }
}



export { PaymentAuthorized, PaymentCaptured,SpeedRefund, PaymentFailed ,CreateRefund , ProceedRefund , FailRefund};
