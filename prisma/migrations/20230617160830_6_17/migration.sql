/*
  Warnings:

  - You are about to drop the column `createdAt` on the `role_resource_permission` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `role_resource_permission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "role_resource_permission" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
