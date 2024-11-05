-- CreateTable
CREATE TABLE "OsFiles" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "osId" TEXT NOT NULL,

    CONSTRAINT "OsFiles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OsFiles" ADD CONSTRAINT "OsFiles_osId_fkey" FOREIGN KEY ("osId") REFERENCES "OS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
