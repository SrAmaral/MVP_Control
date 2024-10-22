import { z } from "zod";
import { publicProcedure } from "~/core/trpc/trpc";

export const getUsers = publicProcedure.input(z.object({})).query(
  ({ctx: {usersService}}) => {
    return usersService.listUsersService();
  },
);
