import { PrismaClient } from "@prisma/client";
import { UpdateUserData } from "../types";

export default function updateUser(data: UpdateUserData, db: PrismaClient) {
  return db.user.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      address: data.address
        ? {
            update: data.address.map((address) => ({
              where: { id: address.id },
              data: { ...address },
            })),
          }
        : undefined,
      role: data.role ? { connect: { id: data.role.id } } : undefined,
    },
  });
}
