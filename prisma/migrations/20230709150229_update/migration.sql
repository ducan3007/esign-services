/*
  Warnings:

  - You are about to drop the column `wallet_address` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `certificate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `email_user_mapping` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'User', 'Accountant', 'Viewer', 'Certificant', 'Signer');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "DocumentStatus" ADD VALUE 'READYTOSIGN';
ALTER TYPE "DocumentStatus" ADD VALUE 'CANCLED';
ALTER TYPE "DocumentStatus" ADD VALUE 'AVAILABLE';
ALTER TYPE "DocumentStatus" ADD VALUE 'REVOKED';

-- DropForeignKey
ALTER TABLE "certificate" DROP CONSTRAINT "certificate_user_id_fkey";

-- DropForeignKey
ALTER TABLE "email_user_mapping" DROP CONSTRAINT "email_user_mapping_email_templateId_fkey";

-- DropForeignKey
ALTER TABLE "email_user_mapping" DROP CONSTRAINT "email_user_mapping_groupId_fkey";

-- DropForeignKey
ALTER TABLE "email_user_mapping" DROP CONSTRAINT "email_user_mapping_userId_fkey";

-- AlterTable
ALTER TABLE "document_signer" ADD COLUMN     "signer_address" TEXT;

-- AlterTable
ALTER TABLE "email_template" ADD COLUMN     "group_id" TEXT,
ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "wallet_address";

-- DropTable
DROP TABLE "certificate";

-- DropTable
DROP TABLE "email_user_mapping";

-- CreateTable
CREATE TABLE "wallet" (
    "id" TEXT NOT NULL,
    "public_key" TEXT NOT NULL,
    "user_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificate_user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "DocumentStatus" NOT NULL,
    "hash256" TEXT NOT NULL,
    "cid" TEXT,
    "certificant_id" TEXT,
    "certificant_email" TEXT,
    "issuer_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "certificate_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "tx_hash" TEXT NOT NULL,
    "content" TEXT,
    "amount" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "certificate_user" ADD CONSTRAINT "certificate_user_certificant_id_fkey" FOREIGN KEY ("certificant_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_template" ADD CONSTRAINT "email_template_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_template" ADD CONSTRAINT "email_template_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
