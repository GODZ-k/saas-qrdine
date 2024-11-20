/*
  Warnings:

  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `network` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_cardId_fkey";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "cardName" TEXT,
ADD COLUMN     "cardType" "CardType" NOT NULL DEFAULT 'debit',
ADD COLUMN     "last4" INTEGER,
ADD COLUMN     "network" VARCHAR(200) NOT NULL;

-- DropTable
DROP TABLE "Card";
