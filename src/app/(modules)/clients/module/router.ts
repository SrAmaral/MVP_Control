import { createTRPCRouter } from "~/core/trpc/trpc";
import { createClient } from "./procedures/CreateClient";
import { listClient, listClientById } from "./procedures/ListClient";
import { updateClient } from "./procedures/UpdateClient";

export const clientsRouter = createTRPCRouter({
    listClient,
    createClient,
    listClientById,
    updateClient
  });
  