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