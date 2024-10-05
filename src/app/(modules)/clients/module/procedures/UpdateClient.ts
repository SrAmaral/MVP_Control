import { publicProcedure } from "~/core/trpc/trpc";
import { clientService } from "../service";
import { clientSchema } from "../types";

export const updateClient = publicProcedure.input(clientSchema).mutation(({ctx:{db},input}) => {
    return clientService.updateCLient(input,db)
})