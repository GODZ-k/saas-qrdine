/*
  Warnings:

  - The values [CREDIT,DEBIT] on the enum `CardType` will be removed. If these variants are still used in the database, this will fail.
  - The values [INITIATED,AUTHORIZED,SUCCESS,REFUNDED,FAILED] on the enum `PaymentStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [MONTHLY,YEARLY,DAILY,WEEKLY] on the enum `PlanInterval` will be removed. If these variants are still used in the database, this will fail.
  - The values [ACTIVE,CREATED,AUTHENTICATED,EXPIRED,CANCELLED,PAUSED,COMPLETED,PENDING,HALTED] on the enum `SubscriptionStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CardType_new" AS ENUM ('credit', 'debit');
ALTER TABLE "Card" ALTER COLUMN "cardType" DROP DEFAULT;
ALTER TABLE "Card" ALTER COLUMN "cardType" TYPE "CardType_new" USING ("cardType"::text::"CardType_new");
ALTER TYPE "CardType" RENAME TO "CardType_old";
ALTER TYPE "CardType_new" RENAME TO "CardType";
DROP TYPE "CardType_old";
ALTER TABLE "Card" ALTER COLUMN "cardType" SET DEFAULT 'debit';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PaymentStatus_new" AS ENUM ('initiated', 'authorized', 'success', 'refunded', 'failed');
ALTER TABLE "Payment" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Payment" ALTER COLUMN "status" TYPE "PaymentStatus_new" USING ("status"::text::"PaymentStatus_new");
ALTER TYPE "PaymentStatus" RENAME TO "PaymentStatus_old";
ALTER TYPE "PaymentStatus_new" RENAME TO "PaymentStatus";
DROP TYPE "PaymentStatus_old";
ALTER TABLE "Payment" ALTER COLUMN "status" SET DEFAULT 'initiated';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PlanInterval_new" AS ENUM ('monthly', 'yearly', 'daily', 'weekly');
ALTER TABLE "Plan" ALTER COLUMN "interval" TYPE "PlanInterval_new" USING ("interval"::text::"PlanInterval_new");
ALTER TYPE "PlanInterval" RENAME TO "PlanInterval_old";
ALTER TYPE "PlanInterval_new" RENAME TO "PlanInterval";
DROP TYPE "PlanInterval_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SubscriptionStatus_new" AS ENUM ('created', 'active', 'authenticated', 'expired', 'cancelled', 'paused', 'completed', 'pending', 'halted');
ALTER TABLE "Subscription" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Subscription" ALTER COLUMN "status" TYPE "SubscriptionStatus_new" USING ("status"::text::"SubscriptionStatus_new");
ALTER TYPE "SubscriptionStatus" RENAME TO "SubscriptionStatus_old";
ALTER TYPE "SubscriptionStatus_new" RENAME TO "SubscriptionStatus";
DROP TYPE "SubscriptionStatus_old";
ALTER TABLE "Subscription" ALTER COLUMN "status" SET DEFAULT 'created';
COMMIT;

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "cardType" SET DEFAULT 'debit';

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "status" SET DEFAULT 'initiated';

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "status" SET DEFAULT 'created';
