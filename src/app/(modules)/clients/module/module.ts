import { createTRPCRouter } from "~/core/trpc/trpc";
import { createClient } from "./procedures/CreateClient";
import { listClient } from "./procedures/ListClient";
import { ClientCreate } from "./services/CreteClientService";
import { ListCLients } from "./services/ListClientsService";

export const clientsRouter = createTRPCRouter({
  listClient,
  createClient
});

export const clientService = {
  ListCLients,
  ClientCreate
};