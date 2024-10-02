import { publicProcedure } from "~/core/trpc/trpc"

export const listClient = publicProcedure
  .query(({ ctx: {clientService}}) => {
    return clientService.ListCLients()
  })