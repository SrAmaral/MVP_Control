import { type PrismaClient } from "@prisma/client";
import { type CreateUserData } from "../types";

export default async function createUser(data: CreateUserData,db:PrismaClient) {
  const { address, role, files, ...userData } = data;
  return await db.user.create({
    data: {
      ...userData,
      address: address
        ? { create: data.address }
        : undefined,
      files: {
        create: files?.map((file) => ({
          ...file,
          user: {
            connect: {
              id: data.id,
            },
          },
      }))
    },
      role: role ? { connect: { id: data.role.id } } : undefined,
    },
    include: {
      address: true,
      role: true,
    },
  });
}
