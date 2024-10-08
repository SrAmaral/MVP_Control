import { z } from "zod"
import { publicProcedure } from "~/core/trpc/trpc"
import { clientService } from "../service"
import { clientSchema } from "../types"

export const createClient = publicProcedure
  .input(
    clientSchema
  )
  .mutation(({ctx: {clientService}, input}) => {
    return clientService.ClientCreate(input)
  })

export const listClient = publicProcedure
  .query(({ ctx: {clientService}}) => {
    return clientService.ListCLients()
  })

  export const listClientById = publicProcedure
  .input(z.string())
  .query(({ ctx: {clientService},input}) => {
    return clientService.ListClientById(input)
  })

export const updateClient = publicProcedure.input(clientSchema).mutation(({ctx:{db},input}) => {
    return clientService.updateCLient(input,db)
})

export const deleteClient = publicProcedure.input(z.string()).mutation(({ctx:{db},input}) => {
    return clientService.deleteClient(input,db)
})
