/*
  Warnings:

  - Made the column `userId` on table `Subscription` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "expireBy" DROP NOT NULL,
ALTER COLUMN "endedAt" DROP NOT NULL,
ALTER COLUMN "shortUrl" DROP NOT NULL,
ALTER COLUMN "changeScheduledAt" DROP NOT NULL,
ALTER COLUMN "offerId" DROP NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;
