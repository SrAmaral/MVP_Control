import { z } from "zod"
import { publicProcedure } from "~/core/trpc/trpc"

export const listClient = publicProcedure
  .query(({ ctx: {clientService}}) => {
    return clientService.ListCLients()
  })

  export const listClientById = publicProcedure
  .input(z.string())
  .query(({ ctx: {clientService},input}) => {
    return clientService.ListClientById(input)
  })