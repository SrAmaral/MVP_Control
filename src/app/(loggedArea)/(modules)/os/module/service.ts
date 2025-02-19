import { type PrismaClient } from "@prisma/client";
import { type OSType } from "./types";

export const OsCreate = async (data: OSType, db: PrismaClient) => {
  const {client, users , ...osData } = data;

  const os = await db.oS.create({
    data: {
      ...osData,
      ...(client && {
        client: {
          connect: {
            id: client.id ?? ""
          },
        }
      }),
      ...(users && {
        users: {
          connect: users.map((user) => ({
            id: user.id ?? ""
          }))
        }
      }),
      files: osData.files
        ? {
            create: osData.files.map((file) => ({
              filename: file.filename ?? "",
              url: file.url ?? "",
              type: file.type ?? "",
            })),
          }
        : undefined
    },
    include: {
      client: true,
      users: true
    }
  });
  
  return os;
}

export const OsList = async (db: PrismaClient) => {
  try {
    return await db.oS.findMany({
      where: {
        logicalDeleted: false
      },
      include: {
        client: true,
        users: true,
        files: true
      }
    })
  } catch (error) {
    console.error(error)
  }
}

export const OsListById = async (id: string, db: PrismaClient) => {
  try {
    return await db.oS.findUnique({
      where: {
        id, AND: {
          logicalDeleted: false
        }
      },
      include: {
        client: {include: {clientAddress: true, contacts: true}},
        users: {include: {address: true, files: true}},
        files: true
      }
    })
  } catch (error) {
    console.error(error)
  }
}


export const OsUpdate = async (data: OSType, db: PrismaClient) => {
  const { client, users, id, ...osData } = data;

  const existingFiles = await db.osFiles.findMany({
    where: {
      osId: data.id,
    },
  });

  const newFiles = osData.files?.filter(
    (file) => !existingFiles.some((existingFile) => existingFile.id === file.id)
  );

  const os = await db.oS.update({
    where: {
      id: id
    },
    data: {
      ...osData,
      serviceDescription: osData.serviceDescription ?? "",
      ...(client && {
        client: {
          connect: {
            id: client.id ?? ""
          }
        }
      }),
      ...(users && {
        users: {
          set: users.map((user) => ({
            id: user.id ?? "",
          }))
        }
      }),
      files: {
        deleteMany: {
          osId: data.id,
          id: { notIn: (data.files ?? []).map((file) => file.id).filter((id): id is number => id !== undefined) },
        },
        create: newFiles?.map((file) => ({
          filename: file.filename ?? "",
          url: file.url ?? "",
          type: file.type ?? "",
          ...file,
        })),
      },
    },
    include: {
      client: true,
      users: true
    }
  });
  
  return os;
}

export const OsDelete = async (id: string, db: PrismaClient) => {
  try {
    return await db.oS.update({
      where: {
        id
      },
      data: {
        logicalDeleted: true
      }
    })
  } catch (error) {
    console.error(error)
  }
}

export const osService = {
  OsCreate,
  OsList,
  OsListById,
  OsUpdate,
  OsDelete,
  };