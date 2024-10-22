/*
  Warnings:

  - You are about to drop the column `clientId` on the `CLientContact` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `ClientAddress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clientContactId]` on the table `CLientContact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clientAddresId]` on the table `ClientAddress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clientContactId` to the `CLientContact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientAddresId` to the `ClientAddress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CLientContact" DROP CONSTRAINT "CLientContact_clientId_fkey";

-- DropForeignKey
ALTER TABLE "ClientAddress" DROP CONSTRAINT "ClientAddress_clientId_fkey";

-- DropIndex
DROP INDEX "CLientContact_clientId_key";

-- DropIndex
DROP INDEX "ClientAddress_clientId_key";

-- AlterTable
ALTER TABLE "CLientContact" DROP COLUMN "clientId",
ADD COLUMN     "clientContactId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ClientAddress" DROP COLUMN "clientId",
ADD COLUMN     "clientAddresId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CLientContact_clientContactId_key" ON "CLientContact"("clientContactId");

-- CreateIndex
CREATE UNIQUE INDEX "ClientAddress_clientAddresId_key" ON "ClientAddress"("clientAddresId");

-- AddForeignKey
ALTER TABLE "ClientAddress" ADD CONSTRAINT "ClientAddress_clientAddresId_fkey" FOREIGN KEY ("clientAddresId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CLientContact" ADD CONSTRAINT "CLientContact_clientContactId_fkey" FOREIGN KEY ("clientContactId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
