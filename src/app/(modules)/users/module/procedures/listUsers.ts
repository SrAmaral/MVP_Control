import { publicProcedure } from "~/core/trpc/trpc";

export const listUsers = publicProcedure.query(({ctx:{usersService}}) => {
    return usersService.listUsersService();
})