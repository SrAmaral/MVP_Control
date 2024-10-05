import { type PrismaClient } from "@prisma/client";
import { type ClientType } from "../types";

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
            connect: { id: data.clientAddress.id },
          }
        : undefined,
    },
  });
}