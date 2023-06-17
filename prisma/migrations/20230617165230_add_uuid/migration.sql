/*
  Warnings:

  - The primary key for the `role_resource_permission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `role_resource_permission` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "role_resource_permission" DROP CONSTRAINT "role_resource_permission_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "role_resource_permission_pkey" PRIMARY KEY ("id");
