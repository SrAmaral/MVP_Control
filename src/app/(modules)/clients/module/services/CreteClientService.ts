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
          id: clientAddress.id?.toString(),
        },
      } : undefined,
      contacts: contacts ? {
        create: contacts.map((contact) => ({
          ...contact,
          id: contact.id.toString(),
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