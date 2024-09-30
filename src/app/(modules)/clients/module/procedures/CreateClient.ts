import { publicProcedure } from "~/core/trpc/trpc"

export const createClient = publicProcedure
  .input(
    z.object({
      
    }),
  )
  .mutation(({ctx: {clientService}, input}) => {
    return clientService.ClientCreate(input)
  })