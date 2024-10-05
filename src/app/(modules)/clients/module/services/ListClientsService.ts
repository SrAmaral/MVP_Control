import { db } from "~/core/db"

export async function ListCLients() {
  try {
    return await db.client.findMany({
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
        id
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