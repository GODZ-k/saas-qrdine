-- DropForeignKey
ALTER TABLE "SubscriptionCharge" DROP CONSTRAINT "SubscriptionCharge_subscriptionId_fkey";

-- AlterTable
ALTER TABLE "SubscriptionCharge" ALTER COLUMN "subscriptionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "SubscriptionCharge" ADD CONSTRAINT "SubscriptionCharge_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
