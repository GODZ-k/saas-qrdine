import prisma from "../../config/db.config.js";

async function SubscriptionAuthenticated(data: any) {
  try {

    console.log("subscription authenticated is working");
    
    await prisma.$transaction(async (prisma) => {
      await prisma.subscription.update({
        where: {
          id: data.subscription.entity.id,
        },
        data: {
          status: data.subscription.entity.status,
          customerId: data.subscription.entity.customer_id,
          startAt: data.subscription.entity.start_at,
          endAt: data.subscription.entity.end_at,
          expireBy: data.subscription.entity.expire_by,
          chargeAt: data.subscription.entity.charge_at,
          shortUrl: data.subscription.entity.short_url,
          paymentMethod: data.subscription.entity.payment_method,
        },
      });
    });
  } catch (error) {
    console.log(error);
  }
}

async function SubscriptionActivated(data: any) {
  try {

    console.log("subscription activated is working");

    await prisma.$transaction(async (prisma) => {
      await prisma.subscription.update({
        where: {
          id: data.subscription.entity.id,
        },
        data: {
          status: data.subscription.entity.status,
          endAt: data.subscription.entity.end_at,
          expireBy: data.subscription.entity.expire_by,
          chargeAt: data.subscription.entity.charge_at,
          shortUrl: data.subscription.entity.short_url,
          paymentMethod: data.subscription.entity.payment_method,
        },
      });

      await prisma.subscriptionCharge.update({
        where: {
          paymentId: data.payment.entity.id,
        },
        data: {
          status: "paid",
          subscriptionId: data.subscription.entity.id,
        },
      });


      await prisma.order.update({
        where: {
          id: data.payment.entity.order_id,
        },
        data: {
          subscriptionId: data.subscription.entity.id,
        },
      });

      await prisma.payment.update({
        where: {
          id: data.payment.entity.id,
        },
        data: {
          subscriptionId: data.subscription.entity.id,
        },
      });
    });
  } catch (error) {
    console.log(error);
  }
}

async function SubscriptionCharged(data: any) {
  try {

    console.log("subscription charged is working");

    await prisma.$transaction(async (prisma) => {
      await prisma.subscription.update({
        where: {
          id: data.subscription.entity.id,
        },
        data: {
          status: data.subscription.entity.status,
          customerId: data.subscription.entity.customer_id,
          expireBy: data.subscription.entity.expire_by,
          shortUrl: data.subscription.entity.short_url,
          remainingCount: data.subscription.entity.remaining_count,
          hasScheduledChanges: data.subscription.entity.has_scheduled_changes,
          paidCount: data.subscription.entity.paid_count,
        },
      });

      await prisma.subscriptionCharge.update({
          where: {
            paymentId: data.payment.entity.id,
          },
          data: {
            status: "paid",
            subscriptionId: data.subscription.entity.id,
          },
      });


      await prisma.order.update({
        where: {
          id: data.payment.entity.order_id,
        },
        data: {
          subscriptionId: data.subscription.entity.id,
        },
      });

      await prisma.payment.update({
        where: {
          id: data.payment.entity.id,
        },
        data: {
          subscriptionId: data.subscription.entity.id,
        },
      });
      
    });
  } catch (error) {
    console.log(error);
  }
}

async function SubscriptionCompleted(data: any) {
  try {

    console.log("subscription completed is working");

    await prisma.$transaction(async (prisma) => {
      await prisma.subscription.update({
        where: {
          id: data.subscription.entity.id,
        },
        data: {
          status: data.subscription.entity.status,
          shortUrl: data.subscription.entity.short_url,
          chargeAt: data.subscription.entity.charge_at,
          remainingCount: data.subscription.entity.remaining_count,
          hasScheduledChanges: data.subscription.entity.has_scheduled_changes,
          paidCount: data.subscription.entity.paid_count,
        },
      });
    });
  } catch (error) {
    console.log(error);
  }
}

async function SubscriptionUpdated(data: any) {
  try {
    console.log("subscription update is working");

    await prisma.$transaction(async (prisma) => {
      await prisma.subscription.update({
        where: {
          id: data.subscription.entity.id,
        },
        data: {
          status: data.subscription.entity.status,
          shortUrl: data.subscription.entity.short_url,
          chargeAt: data.subscription.entity.charge_at,
          remainingCount: data.subscription.entity.remaining_count,
          hasScheduledChanges: data.subscription.entity.has_scheduled_changes,
          paidCount: data.subscription.entity.paid_count,
          quantity: data.subscription.entity.quantity,
          totalCount: data.subscription.entity.total_count,
          expireBy: data.subscription.entity.expire_by,
          offerId: data.subscription.entity.offer_id,
        },
      });
    });
  } catch (error) {
    console.log(error);
  }
}

async function SubscriptionPending(data: any) {
  try {

    console.log("subscription pending is working");

    await prisma.$transaction(async (prisma) => {
      await prisma.subscription.update({
        where: {
          id: data.subscription.entity.id,
        },
        data: {
          status: data.subscription.entity.status,
          chargeAt: data.subscription.entity.charge_at,
          remainingCount: data.subscription.entity.remaining_count,
          paidCount: data.subscription.entity.paid_count,
          totalCount: data.subscription.entity.total_count,
          expireBy: data.subscription.entity.expire_by,
        },
      });
    });
  } catch (error) {
    console.log(error);
  }
}

async function SubscriptionHalted(data: any) {
  try {

    console.log("subscription halted is working");

    await prisma.$transaction(async (prisma) => {
      await prisma.subscription.update({
        where: {
          id: data.subscription.entity.id,
        },
        data: {
          status: data.subscription.entity.status,
          chargeAt: data.subscription.entity.charge_at,
          remainingCount: data.subscription.entity.remaining_count,
          paidCount: data.subscription.entity.paid_count,
          totalCount: data.subscription.entity.total_count,
          expireBy: data.subscription.entity.expire_by,
        },
      });
    });
  } catch (error) {
    console.log(error);
  }
}

async function SubscriptionPaused(data: any) {
  try {
    console.log("subscription paused is working");

    await prisma.$transaction(async (prisma) => {
      await prisma.subscription.update({
        where: {
          id: data.subscription.entity.id,
        },
        data: {
          status: data.subscription.entity.status,
          chargeAt: data.subscription.entity.charge_at,
          remainingCount: data.subscription.entity.remaining_count,
        },
      });
    });
  } catch (error) {
    console.log(error);
  }
}

async function SubscriptionResumed(data: any) {
  try {

    console.log("subscription resumed is working");

    await prisma.$transaction(async (prisma) => {
      await prisma.subscription.update({
        where: {
          id: data.subscription.entity.id,
        },
        data: {
          status: data.subscription.entity.status,
          chargeAt: data.subscription.entity.charge_at,
          remainingCount: data.subscription.entity.remaining_count,
          paidCount: data.subscription.entity.paid_count,
          totalCount: data.subscription.entity.total_count,
          expireBy: data.subscription.entity.expire_by,
        },
      });
    });
  } catch (error) {
    console.log(error);
  }
}

async function SubscriptionCancelled(data: any) {
  try {

    console.log("subscription cancelled is working");

    await prisma.$transaction(async (prisma) => {
      await prisma.subscription.update({
        where: {
          id: data.subscription.entity.id,
        },
        data: {
          status: data.subscription.entity.status,
          chargeAt: data.subscription.entity.charge_at,
          remainingCount: data.subscription.entity.remaining_count,
          paidCount: data.subscription.entity.paid_count,
          hasScheduledChanges: data.subscription.entity.has_scheduled_changes,
          totalCount: data.subscription.entity.total_count,
          expireBy: data.subscription.entity.expire_by,
        },
      });
    });
  } catch (error) {
    console.log(error);
  }
}

export {
  SubscriptionAuthenticated,
  SubscriptionActivated,
  SubscriptionCharged,
  SubscriptionCancelled,
  SubscriptionCompleted,
  SubscriptionHalted,
  SubscriptionPaused,
  SubscriptionPending,
  SubscriptionUpdated,
  SubscriptionResumed,
};
