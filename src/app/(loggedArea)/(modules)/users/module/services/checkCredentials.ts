import { type PrismaClient } from "@prisma/client";

export default function checkCredentials(
  email: string,
  db:PrismaClient
) {
  return db.user.findFirst({
    where: {
      email,
    },
  });
}
