import { publicProcedure } from "~/core/trpc/trpc";
import { CreateUserSchema } from "../types";

export const CreateUser = publicProcedure.input(CreateUserSchema).mutation(({ctx:{usersService,db},input}) => {
  return usersService.createUser(input,db);
});
