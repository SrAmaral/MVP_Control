import { type Prisma } from "@prisma/client"

export type ClientType = Prisma.ClientGetPayload<{
  include: {
    clientAddress: true,
    contacts: true
  }
}>