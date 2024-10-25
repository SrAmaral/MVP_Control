import { type PrismaClient } from "@prisma/client";

export default async function listFiles(db: PrismaClient) {
  return db.userFile.findMany();
}