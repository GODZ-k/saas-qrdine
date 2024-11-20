/*
  Warnings:

  - You are about to drop the column `vpd` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "vpd",
ADD COLUMN     "vpa" TEXT;
