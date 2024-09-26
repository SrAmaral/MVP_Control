import { publicProcedure } from "~/core/trpc/trpc";
import { UpdateUserSchema } from "../types";

export const UpdateUser = publicProcedure.input(UpdateUserSchema).mutation(({ctx:{usersService,db},input}) => {
    return usersService.updateUser(input,db);
})