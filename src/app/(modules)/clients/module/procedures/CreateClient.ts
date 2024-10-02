import { publicProcedure } from "~/core/trpc/trpc"
import { clientSchema } from "../types"

export const createClient = publicProcedure
  .input(
    clientSchema
  )
  .mutation(({ctx: {clientService}, input}) => {
    return clientService.ClientCreate(input)
  })