import { createTRPCRouter } from "~/core/trpc/trpc";
import { listClient } from "./procedures/ListClient";
import { ListCLients } from "./services/ListClientsService";

export const clientsRouter = createTRPCRouter({
  listClient,
});

export const clientService = {
  ListCLients,
};