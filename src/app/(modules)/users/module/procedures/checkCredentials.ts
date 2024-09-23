import { z } from "zod";
import { publicProcedure } from "~/core/trpc/trpc";

export const checkCredentials = publicProcedure
.input(
  z.object({
    email: z.string(),
    password: z.string(),
  }),
)
.query(({ ctx, input }) => {
  const user = ctx.db.user.findFirst({
    where: {
      email: input.email,
      password: input.password,
    },
  });

  return user;
})