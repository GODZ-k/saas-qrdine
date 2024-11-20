-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER', 'STAFF');

-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('BASIC', 'PRO');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'CREATED', 'AUTHENTICATED', 'EXPIRED', 'CANCELLED', 'PAUSED', 'COMPLETED', 'PENDING', 'HALTED');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('INR', 'USD', 'EUR');

-- CreateEnum
CREATE TYPE "PlanInterval" AS ENUM ('MONTHLY', 'YEARLY', 'DAILY', 'WEEKLY');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('INITIATED', 'AUTHORIZED', 'SUCCESS', 'REFUNDED', 'FAILED');

-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('CREDIT', 'DEBIT');

-- CreateTable
CREATE TABLE "Demo" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(200) NOT NULL,
    "lastName" VARCHAR(200) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "message" VARCHAR(500),
    "preferedTime" TIMESTAMP(3),
    "staffId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Demo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(200),
    "lastName" VARCHAR(200),
    "avatar" TEXT,
    "username" TEXT,
    "emailAddress" TEXT,
    "subscriptionId" TEXT,
    "restaurantId" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastActiveAt" TIMESTAMP(3),
    "lastSignInAt" TIMESTAMP(3),
    "isSubscribed" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    "mfaEnabled" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "locked" BOOLEAN NOT NULL DEFAULT false,
    "backupCodeEnabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phone" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Phone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailAddress" (
    "id" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verification" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" TEXT NOT NULL,
    "restaurantName" VARCHAR(200) NOT NULL,
    "restaurantUrl" VARCHAR(200) NOT NULL,
    "restaurantType" VARCHAR(200) NOT NULL,
    "foodMenu" VARCHAR(500) NOT NULL,
    "tables" INTEGER NOT NULL DEFAULT 0,
    "staffCount" INTEGER NOT NULL DEFAULT 0,
    "location" VARCHAR(200) NOT NULL,
    "businessEmail" VARCHAR(300) NOT NULL,
    "businessContactNumber" INTEGER NOT NULL,
    "companyName" VARCHAR(200) NOT NULL,
    "ownerName" VARCHAR(200) NOT NULL,
    "restaurantAddress" TEXT NOT NULL,
    "restaurantLegalInfo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RestaurantAddress" (
    "id" TEXT NOT NULL,
    "address" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RestaurantAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RestaurantLegalInfo" (
    "id" TEXT NOT NULL,
    "gst" VARCHAR(15) NOT NULL,
    "fssaiLicence" VARCHAR(500) NOT NULL,
    "msmeCertificate" VARCHAR(500) NOT NULL,
    "companyPan" VARCHAR(500) NOT NULL,
    "phoneNo" VARCHAR(15) NOT NULL,
    "directorPan" VARCHAR(500) NOT NULL,
    "directorAadhar" VARCHAR(500) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "cancelCheque" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RestaurantLegalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "customerId" TEXT,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'CREATED',
    "quantity" INTEGER NOT NULL,
    "totalCount" INTEGER NOT NULL,
    "paidCount" INTEGER NOT NULL,
    "remainingCount" INTEGER NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endAt" TIMESTAMP(3) NOT NULL,
    "expireBy" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3) NOT NULL,
    "shortUrl" VARCHAR(255) NOT NULL,
    "hasScheduledChanges" BOOLEAN NOT NULL DEFAULT false,
    "changeScheduledAt" TIMESTAMP(3) NOT NULL,
    "offer_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "name" "PlanType" NOT NULL DEFAULT 'BASIC',
    "amount" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'INR',
    "interval" "PlanInterval" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "description" VARCHAR(300) NOT NULL,
    "hsnCode" VARCHAR(50) NOT NULL,
    "sacCode" VARCHAR(50) NOT NULL,
    "taxInclusive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "cusId" TEXT NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'INR',
    "status" "PaymentStatus" NOT NULL DEFAULT 'INITIATED',
    "paymentMethod" VARCHAR(255) NOT NULL,
    "bank" TEXT,
    "vpd" TEXT,
    "bankTransitionId" TEXT,
    "amountRefunded" INTEGER NOT NULL DEFAULT 0,
    "wallet" TEXT,
    "acquirerTransitionId" TEXT,
    "email" VARCHAR(255) NOT NULL,
    "contact" VARCHAR(255) NOT NULL,
    "invoice" TEXT NOT NULL,
    "cardId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last4" INTEGER NOT NULL,
    "network" VARCHAR(200) NOT NULL,
    "cardType" "CardType" NOT NULL DEFAULT 'DEBIT',
    "expireMonth" INTEGER NOT NULL,
    "expireYear" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Demo_email_key" ON "Demo"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Demo_phone_key" ON "Demo"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_emailAddress_key" ON "User"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "User_subscriptionId_key" ON "User"("subscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "User_restaurantId_key" ON "User"("restaurantId");

-- CreateIndex
CREATE UNIQUE INDEX "EmailAddress_emailAddress_key" ON "EmailAddress"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_businessEmail_key" ON "Restaurant"("businessEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_businessContactNumber_key" ON "Restaurant"("businessContactNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_restaurantAddress_key" ON "Restaurant"("restaurantAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_restaurantLegalInfo_key" ON "Restaurant"("restaurantLegalInfo");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantLegalInfo_gst_key" ON "RestaurantLegalInfo"("gst");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantLegalInfo_phoneNo_key" ON "RestaurantLegalInfo"("phoneNo");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantLegalInfo_email_key" ON "RestaurantLegalInfo"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_customerId_key" ON "Subscription"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_invoice_key" ON "Payment"("invoice");

-- AddForeignKey
ALTER TABLE "Demo" ADD CONSTRAINT "Demo_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailAddress" ADD CONSTRAINT "EmailAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_restaurantLegalInfo_fkey" FOREIGN KEY ("restaurantLegalInfo") REFERENCES "RestaurantLegalInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_restaurantAddress_fkey" FOREIGN KEY ("restaurantAddress") REFERENCES "RestaurantAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_cusId_fkey" FOREIGN KEY ("cusId") REFERENCES "Subscription"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;
