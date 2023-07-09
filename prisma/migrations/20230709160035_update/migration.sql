-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Admin', 'User', 'Accountant', 'Viewer', 'Certificant', 'Signer');

-- AlterTable
ALTER TABLE "user_feature_permission" ADD COLUMN     "permission_id" INTEGER;

-- DropEnum
DROP TYPE "Role";
