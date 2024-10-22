-- CreateTable
CREATE TABLE "OS" (
    "id" TEXT NOT NULL,
    "scheduleDate" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deadline" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "logicalDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "OS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OSToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OSToUser_AB_unique" ON "_OSToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_OSToUser_B_index" ON "_OSToUser"("B");

-- AddForeignKey
ALTER TABLE "OS" ADD CONSTRAINT "OS_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OSToUser" ADD CONSTRAINT "_OSToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "OS"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OSToUser" ADD CONSTRAINT "_OSToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
