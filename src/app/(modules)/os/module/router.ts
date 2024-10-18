import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/core/trpc/trpc";
import { clientService, osService } from "./service";
import { clientSchema, osSchema } from "./types";

export const createOs = publicProcedure
  .input(
    osSchema
  )
  .mutation(({ctx: {db}, input}) => {
    return osService.OsCreate(input, db)
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


export const osRouter = createTRPCRouter({
    
  });
  