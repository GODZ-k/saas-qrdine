/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `SubscriptionCharge` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[invoiceId]` on the table `SubscriptionCharge` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "subscriptionId" TEXT;

-- AlterTable
ALTER TABLE "SubscriptionCharge" ADD COLUMN     "invoiceId" TEXT DEFAULT '',
ADD COLUMN     "orderId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionCharge_orderId_key" ON "SubscriptionCharge"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionCharge_invoiceId_key" ON "SubscriptionCharge"("invoiceId");

-- AddForeignKey
ALTER TABLE "SubscriptionCharge" ADD CONSTRAINT "SubscriptionCharge_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
