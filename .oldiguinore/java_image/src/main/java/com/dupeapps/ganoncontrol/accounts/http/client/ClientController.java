package com.dupeapps.ganoncontrol.accounts.http.client;

import com.dupeapps.ganoncontrol.accounts.domain.client.Client;
import com.dupeapps.ganoncontrol.accounts.domain.client.ClientService;
import com.dupeapps.ganoncontrol.accounts.http.client.response.ClientListItem;
import com.dupeapps.ganoncontrol.accounts.http.client.response.ClientResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts/clients")
@CrossOrigin
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping
    public ResponseEntity<List<ClientListItem>> getAllClients() {
        List<Client> c = clientService.getAllClients();
        List<ClientListItem> ncr = ClientResponse.getAllClientsResponse(c);
        return new ResponseEntity<>(ncr, null, 200);
    }

    @GetMapping("/{id}")
    public Client getClientById(@PathVariable Long id) {
        return clientService.getClientById(id);
    }

    @PostMapping
    public Client createClient(@RequestBody Client client) {
        return clientService.createClient(client);
    }

    @PutMapping("/{id}")
    public Client updateClient(@PathVariable Long id, @RequestBody Client clientDetails) {
        return clientService.updateClient(id, clientDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
    }
}
