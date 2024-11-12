import { publicProcedure } from "~/core/trpc/trpc";
import { CreateUserSchema } from "../types";

export const UpdateUser = publicProcedure.input(CreateUserSchema).mutation(({ctx:{usersService,db},input}) => {
    return usersService.updateUser(input,db);
})