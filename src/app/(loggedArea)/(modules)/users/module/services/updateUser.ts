import { type PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { type CreateUserData } from "../types";

export default async function updateUser(data: CreateUserData, db: PrismaClient) {
  // Check if files are already associated with the user to avoid duplication
  const existingFiles = await db.userFile.findMany({
    where: {
      userId: data.id,
    },
  });

  const newFiles = data.files?.filter(
    (file) => !existingFiles.some((existingFile) => existingFile.id === file.id)
  );

  return db.user.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      password: await bcrypt.hash(data.password, 10),
      address: data.address
        ? {
            update: {
              where: { id: data.address.id },
              data: { ...data.address },
            },
          }
        : undefined,
      files: newFiles
        ? {
            deleteMany: {
              userId: data.id,
              id: { notIn: (data.files ?? []).map((file) => file.id).filter((id): id is number => id !== undefined) },
            },
            create: newFiles.map((file) => ({
              filename: file.filename ?? "",
              url: file.url ?? "",
              type: file.type ?? "",
              ...file,
            })),
          }
        : undefined,
      // roleId: data.roleId ? { connect: { id: data.roleId } } : undefined,
    },
  });
}
