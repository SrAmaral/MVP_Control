import { createTRPCRouter } from "~/core/trpc/trpc";
import { createClient } from "./procedures/CreateClient";
import { listClient } from "./procedures/ListClient";

export const clientsRouter = createTRPCRouter({
    listClient,
    createClient
  });
  