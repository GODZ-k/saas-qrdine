/*
  Warnings:

  - You are about to drop the column `offer_id` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `offerId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "offer_id",
ADD COLUMN     "offerId" VARCHAR(255) NOT NULL;
