import { publicProcedure } from "~/core/trpc/trpc";

export const ListFiles = publicProcedure.query(({ctx:{usersService,db}}) => {
  return usersService.listFiles(db);
})