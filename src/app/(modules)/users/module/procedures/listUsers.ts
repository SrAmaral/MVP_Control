import { publicProcedure } from "~/core/trpc/trpc";

export const ListUsers = publicProcedure.query(({ctx:{usersService,db}}) => {
    return usersService.listUsers(db);
})