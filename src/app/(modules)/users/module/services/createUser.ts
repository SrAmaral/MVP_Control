import { type PrismaClient } from "@prisma/client";
import { type CreateUserData } from "../types";

export default async function createUser(data: CreateUserData,db:PrismaClient) {
  return await db.user.create({
    data: {
      ...data,
      address: data.address
        ? { create: data.address }
        : undefined,
      role: data.role ? { connect: { id: data.role.id } } : undefined,
    },
    include: {
      address: true,
      role: true,
    },
  });
}
