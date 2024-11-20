/*
  Warnings:

  - Added the required column `period` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `interval` on the `Plan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "period" "PlanInterval" NOT NULL,
DROP COLUMN "interval",
ADD COLUMN     "interval" INTEGER NOT NULL;
