import { z } from "zod";
import { publicProcedure } from "~/core/trpc/trpc";

export const ListUsers = publicProcedure.query(({ctx:{usersService,db}}) => {
    return usersService.listUsers(db);
})
export const ListUserById = publicProcedure.input(z.string()).query(({ctx:{usersService,db},input}) => {
    return usersService.listUserById(input,db);
})