import { z } from "zod";
import { publicProcedure } from "~/core/trpc/trpc";

export const CheckCredentials = publicProcedure
  .input(
    z.object({
      email: z.string(),
      password: z.string(),
    }),
  )
  .query(({ ctx:{ usersService,db}, input }) => {
    const user = usersService.checkCredentials(
      input.email,
      input.password,
      db
    );
    return user;
  });
