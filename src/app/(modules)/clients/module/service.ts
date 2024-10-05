import { ClientCreate } from "./services/CreteClientService";
import { ListClientById, ListCLients } from "./services/ListClientsService";
import { updateCLient } from "./services/UpdateClientService";

export const clientService = {
    ListCLients,
    ClientCreate,
    ListClientById,
    updateCLient
  };