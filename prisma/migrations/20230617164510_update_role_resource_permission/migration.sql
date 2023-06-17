/*
  Warnings:

  - The primary key for the `role_resource_permission` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "role_resource_permission" DROP CONSTRAINT "role_resource_permission_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "role_resource_permission_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "role_resource_permission_id_seq";
