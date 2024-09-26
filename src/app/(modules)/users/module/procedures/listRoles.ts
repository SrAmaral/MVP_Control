import { publicProcedure } from "~/core/trpc/trpc";

export const ListRoles = publicProcedure.query(({ctx:{usersService,db}}) => {
    return usersService.listRoles(db);
})