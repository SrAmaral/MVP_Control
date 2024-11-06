-- AlterTable
ALTER TABLE "OS" ADD COLUMN     "realizedDate" TEXT DEFAULT '',
ADD COLUMN     "serviceDescription" TEXT DEFAULT '',
ALTER COLUMN "status" SET DEFAULT 'pending';
