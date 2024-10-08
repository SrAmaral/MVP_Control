import { createTRPCRouter } from "~/core/trpc/trpc";
import { createClient, deleteClient, listClient, listClientById, updateClient } from "./procedures/procedures";


export const clientsRouter = createTRPCRouter({
    listClient,
    createClient,
    listClientById,
    updateClient,
    deleteClient
  });
  