package com.dupeapps.ganoncontrol.accounts.app;

import com.dupeapps.ganoncontrol.accounts.domain.client.Client;
import com.dupeapps.ganoncontrol.accounts.domain.client.ClientRepository;
import com.dupeapps.ganoncontrol.accounts.domain.client.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Client getClientById(Long id) {
        return clientRepository.findById(id).orElse(null);
    }

    public Client createClient(Client client) {
        return clientRepository.save(client);
    }

    public Client updateClient(Long id, Client clientDetails) {
        Client client = clientRepository.findById(id).orElse(null);
        if (client != null) {
            client.setName(clientDetails.getName());
            client.setLocation(clientDetails.getLocation());
            return clientRepository.save(client);
        }
        return null;
    }

    public void deleteClient(Long id) {
        clientRepository.deleteById(id);
    }
}

