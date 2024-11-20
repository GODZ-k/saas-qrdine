/*
  Warnings:

  - The `expireBy` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `endedAt` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "expireBy",
ADD COLUMN     "expireBy" TIMESTAMP(3),
DROP COLUMN "endedAt",
ADD COLUMN     "endedAt" TIMESTAMP(3);
