package com.dupeapps.ganoncontrol.accounts.client;

import com.dupeapps.ganoncontrol.accounts.client.Client;

import java.util.List;

public interface ClientService {
    List<Client> getAllClients();
    Client getClientById(Long id);
    Client createClient(Client client);
    Client updateClient(Long id, Client client);
    void deleteClient(Long id);
}
