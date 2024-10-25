import { type PrismaClient } from "@prisma/client";
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
      address: data.address
        ? {
            update: data.address.map((address) => ({
              where: { id: address.id },
              data: { ...address },
            })),
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
      role: data.role ? { connect: { id: data.role.id } } : undefined,
    },
  });
}
