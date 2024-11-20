/*
  Warnings:

  - Changed the type of `currency` on the `Payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `name` on the `Plan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `currency` on the `Plan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "currency",
ADD COLUMN     "currency" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "name",
ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "currency",
ADD COLUMN     "currency" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Currency";

-- DropEnum
DROP TYPE "PlanType";
