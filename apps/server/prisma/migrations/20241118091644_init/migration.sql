-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "currency" TEXT,
ALTER COLUMN "status" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "network" DROP NOT NULL;
