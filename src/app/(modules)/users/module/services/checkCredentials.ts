import { PrismaClient } from "@prisma/client";

export default function checkCredentials(
  email: string,
  password: string,
  db:PrismaClient
) {
  return db.user.findFirst({
    where: {
      email,
      password,
    },
  });
}
