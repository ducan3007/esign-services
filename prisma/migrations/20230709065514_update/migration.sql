/*
  Warnings:

  - You are about to drop the column `user_id` on the `document_signer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "document_signer" DROP CONSTRAINT "document_signer_user_id_fkey";

-- AlterTable
ALTER TABLE "audit_log" ADD COLUMN     "user_email" TEXT;

-- AlterTable
ALTER TABLE "certificate" ADD COLUMN     "user_email" TEXT;

-- AlterTable
ALTER TABLE "document" ADD COLUMN     "user_email" TEXT;

-- AlterTable
ALTER TABLE "document_signer" DROP COLUMN "user_id",
ADD COLUMN     "signer_email" TEXT,
ADD COLUMN     "signer_id" TEXT;

-- AlterTable
ALTER TABLE "signature" ADD COLUMN     "user_email" TEXT;

-- AddForeignKey
ALTER TABLE "document_signer" ADD CONSTRAINT "document_signer_signer_id_fkey" FOREIGN KEY ("signer_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
