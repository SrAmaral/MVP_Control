-- AlterTable
ALTER TABLE "CLientContact" ADD COLUMN     "logicalDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "logicalDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ClientAddress" ADD COLUMN     "logicalDeleted" BOOLEAN NOT NULL DEFAULT false;
