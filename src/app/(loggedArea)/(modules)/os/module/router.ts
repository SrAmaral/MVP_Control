import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/core/trpc/trpc";
import { osService } from "./service";
import { osSchema } from "./types";

export const createOs = publicProcedure
  .input(
    osSchema
  )
  .mutation(({ctx: {db}, input}) => {
    return osService.OsCreate(input, db)
  })

export const listOs = publicProcedure
  .query(({ ctx: {db}}) => {
    return osService.OsList(db)
  })

  export const listOsById = publicProcedure
  .input(z.string())
  .query(({ ctx: {db},input}) => {
    return osService.OsListById(input, db)
  })

export const updateOs = publicProcedure.input(osSchema).mutation(({ctx:{db},input}) => {
    return osService.OsUpdate(input,db)
})


export const deleteOs = publicProcedure.input(z.string()).mutation(({ctx:{db},input}) => {
    return osService.OsDelete(input,db)
})


export const osRouter = createTRPCRouter({
    createOs,
    listOs,
    listOsById,
    updateOs,
    deleteOs,
  });
  