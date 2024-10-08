import { type PrismaClient } from "@prisma/client";
import { db } from "~/core/db";
import { type ClientType } from "../types";

export async function ClientCreate(data: ClientType) {
  const { clientAddress, contacts, ...clientData } = data;

  const client = await db.client.create({
    data: {
      ...clientData,
      clientAddress: clientAddress ? {
        create: {
          ...clientAddress,
        },
      } : undefined,
      contacts: contacts ? {
        create: contacts.map((contact) => ({
          ...contact,
        })),
      } : undefined,
    },
    include: {
      clientAddress: true,
      contacts: true
    }
  });

  return client;
}


export async function ListCLients() {
  try {
    return await db.client.findMany({
      where: {
        logicalDeleted: false
      },
      include: {
        clientAddress: true,
        contacts: true
      }
    })
  } catch (error) {
    console.error(error)
  }
}

export async function ListClientById(id: string) {
  try {
    return await db.client.findUnique({
      where: {
        id, AND: {
          logicalDeleted: false
        }
      },
      include: {
        clientAddress: true,
        contacts: true
      }
    })
  } catch (error) {
    console.error(error)
  }
}

export function updateCLient(data: ClientType, db: PrismaClient) {
  return db.client.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,

      contacts: data.contacts
        ? {
            update: data.contacts.map((contact) => ({
              where: { id: contact.id },
              data: { ...contact },
            })),
          }
        : undefined,

        clientAddress: data.clientAddress
        ? {
            update: {
              where: { id: data.clientAddress.id },
              data: { ...data.clientAddress }
            }
          }
        : undefined,
    },
  });
}

export async function deleteClient(id: string, db: PrismaClient) {
  const client = await ListClientById(id)
  try {
    return await db.client.update({
      where: {
        id
      },
      data: {
        ...client,
        logicalDeleted: true,
        clientAddress: {
          update: {
            logicalDeleted: true
          }
        },
        contacts: {
          update: client?.contacts.map((contact) => ({
            where: { id: contact.id },
            data: { logicalDeleted: true }
          }))
        }
    }
  })
  } catch (error) {
    console.error(error)
  }
}