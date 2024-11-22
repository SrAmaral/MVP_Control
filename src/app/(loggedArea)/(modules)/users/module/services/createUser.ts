import { type PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { type CreateUserData } from "../types";

export default async function createUser(data: CreateUserData,db:PrismaClient) {
  const { address, roleId, files, ...userData } = data;
  return await db.user.create({
    data: {
      ...userData,
      pis: userData.pis ?? "",
      ctps: userData.ctps ?? "",
      salary: userData.salary ?? "",
      workLoad: userData.workLoad ?? "",
      comment: userData.comment ?? "",
      address: address
        ? { create: {...data.address,} }
        : undefined,
      password: await bcrypt.hash(data.password, 10),
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
      roleId: data.roleId ?? undefined,
    },
    include: {
      address: true,
      role: true,
    },
  });
}
